import Animated from "react-native-reanimated"
import { move } from "react-native-redash"

export type SharedValues<T extends Record<string, string | number | boolean>> = {
  [K in keyof T]: Animated.SharedValue<T[K]>
}

export type Offset = SharedValues<{
  order: number
  width: number
  height: number
  x: number
  y: number
  originalX: number
  originalY: number
}>

export const MARGIN_TOP = 150
export const MARGIN_LEFT = 32
export const NUMBER_OF_LINES = 3
export const WORD_HEIGHT = 55
export const SENTENCE_HEIGHT = (NUMBER_OF_LINES - 1) * WORD_HEIGHT

export const isNotInWordBank = (offset: Offset) => {
  "worklet"
  return offset.order.value !== -1
}
export const byOrder = (a: Offset, b: Offset) => {
  "worklet"
  return a.order.value > b.order.value ? 1 : -1
}

export const lastOrder = (input: Offset[]) => {
  "worklet"
  return input.filter(isNotInWordBank).length
}

export const remove = (input: Offset[], index: number) => {
  "worklet"
  const offsets = input
    .filter((o, i) => i !== index)
    .filter(isNotInWordBank)
    .sort(byOrder)
  offsets.map((offset, i) => (offset.order.value = i))
}

export const reorder = (input: Offset[], from: number, to: number) => {
  "worklet"
  const offsets = input.filter(isNotInWordBank).sort(byOrder)
  const newOffset = move(offsets, from, to)
  newOffset.map((offset, index) => (offset.order.value = index))
}

export const calculateLayout = (input: Offset[], containerWidth: number) => {
  "worklet"

  // words sorted inOrder which are not in the word bank
  const offsets = input.filter(isNotInWordBank).sort(byOrder)
  if (offsets.length === 0) return

  // number of line with words
  let lineNumber = 0

  // index that is the last one before next line
  let lineBreak = 0

  offsets.forEach((offset, index) => {
    // total width for all words, until line break word
    const total = offsets.slice(lineBreak, index).reduce((acc, o) => acc + o.width.value, 0)

    // in case there is too many words in one line
    if (total + offset.width.value > containerWidth) {
      lineNumber += 1
      lineBreak = index
      offset.x.value = 0
    } else {
      offset.x.value = total
    }
    offset.y.value = WORD_HEIGHT * lineNumber
  })
}
