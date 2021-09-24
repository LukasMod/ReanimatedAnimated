import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../../../components"
import { spacing } from "../../../theme"

const BLACK = "rgb(100, 133, 68)"
const WHITE = "rgb(230, 233, 198)"

const CONTAINER: ViewStyle = {
  flex: 1,
}

const ROW_CONTAINER: ViewStyle = {
  flex: 1,
  flexDirection: "row",
}
const PLACE: ViewStyle = {
  flex: 1,
  padding: spacing[1],
  justifyContent: "space-between",
}
const TEXT: TextStyle = {
  fontWeight: "500",
}

interface SquareProps {
  row: number
  col: number
}

const Square = ({ row, col }: SquareProps) => {
  const offset = row % 2 === 0 ? 0 : 1
  const backgroundColor = (col + offset) % 2 === 0 ? WHITE : BLACK
  const color = (col + offset) % 2 === 0 ? BLACK : WHITE

  const TEXT_COL: TextStyle = {
    alignSelf: "flex-end",
    color,
    opacity: row === 7 ? 1 : 0,
  }
  const TEXT_ROW: TextStyle = {
    color,
    opacity: col === 0 ? 1 : 0,
  }

  return (
    <View style={[PLACE, { backgroundColor }]}>
      <Text style={[TEXT, TEXT_ROW]}>{8 - row}</Text>
      <Text style={[TEXT, TEXT_COL]}>{String.fromCharCode("a".charCodeAt(0) + col)}</Text>
    </View>
  )
}

interface RowProps {
  row: number
}

const Row = ({ row }: RowProps) => {
  return (
    <View style={ROW_CONTAINER}>
      {new Array(8).fill(0).map((_, col) => (
        <Square key={col} row={row} col={col} />
      ))}
    </View>
  )
}

interface BackgroundProps {}

const Background = () => {
  return (
    <View style={CONTAINER}>
      {new Array(8).fill(0).map((_, i) => (
        <Row key={i} row={i} />
      ))}
    </View>
  )
}

export default Background
