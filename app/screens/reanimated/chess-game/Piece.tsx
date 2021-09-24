import React, { useCallback } from "react"
import { Image, ImageSourcePropType, ImageStyle, ViewStyle } from "react-native"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { Vector } from "react-native-redash"
import { Position, Chess } from "chess.js"

import { SIZE, toTranslation, toPosition } from "./Notation"

const CONTAINER: ViewStyle = {
  height: SIZE,
  width: SIZE,
  position: "absolute",
}

const PIECE: ImageStyle = {
  height: SIZE,
  width: SIZE,
}

export type Player = "b" | "w"
type Type = "q" | "r" | "n" | "b" | "k" | "p"
type PieceType = `${Player}${Type}`
type Pieces = Record<PieceType, ImageSourcePropType>
export const PIECES: Pieces = {
  br: require("./assets/br.png"),
  bp: require("./assets/bp.png"),
  bn: require("./assets/bn.png"),
  bb: require("./assets/bb.png"),
  bq: require("./assets/bq.png"),
  bk: require("./assets/bk.png"),
  wr: require("./assets/wr.png"),
  wn: require("./assets/wn.png"),
  wb: require("./assets/wb.png"),
  wq: require("./assets/wq.png"),
  wk: require("./assets/wk.png"),
  wp: require("./assets/wp.png"),
}

export interface PieceProps {
  id: PieceType
  position: Vector
  chess: Chess
  onTurn: () => void
  enabled: boolean
}

const Piece = ({ id, position, chess, onTurn, enabled }: PieceProps) => {
  const isGestureActive = useSharedValue(false)
  const offsetX = useSharedValue(0)
  const offsetY = useSharedValue(0)
  const translateX = useSharedValue(position.x)
  const translateY = useSharedValue(position.y)

  const movePiece = useCallback(
    (from: Position, to: Position) => {
      const move = chess
        .moves({ verbose: true })
        .find((move) => move.from === from && move.to === to)

      const { x, y } = toTranslation(move ? to : from)

      translateX.value = withTiming(x)
      translateY.value = withTiming(y, {}, () => {
        isGestureActive.value = false
      })

      if (move) {
        chess.move(move)
        onTurn()
      }
    },
    [chess, onTurn, translateX, translateY],
  )

  const R_PIECE = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    zIndex: isGestureActive.value ? 100 : 10,
  }))

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => {
      isGestureActive.value = true
      offsetX.value = translateX.value
      offsetY.value = translateY.value
    },
    onActive: (event) => {
      translateX.value = event.translationX + offsetX.value
      translateY.value = event.translationY + offsetY.value
    },
    onEnd: () => {
      const from = toPosition({ x: offsetX.value, y: offsetY.value })
      const to = toPosition({ x: translateX.value, y: translateY.value })

      runOnJS(movePiece)(from, to)
    },
  })

  const R_FROM = useAnimatedStyle(() => {
    return {
      backgroundColor: "rgba(255, 255, 0, 0.5)",
      opacity: isGestureActive.value ? 1 : 0,
      transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
    }
  })
  const R_TO = useAnimatedStyle(() => {
    const tr = toTranslation(toPosition({ x: translateX.value, y: translateY.value }))

    return {
      backgroundColor: "rgba(255, 255, 0, 0.3)",
      opacity: isGestureActive.value ? 1 : 0,
      transform: [{ translateX: tr.x }, { translateY: tr.y }],
    }
  })

  return (
    <>
      <Animated.View style={[CONTAINER, R_FROM]} />
      <Animated.View style={[CONTAINER, R_TO]} />

      <PanGestureHandler onGestureEvent={onGestureEvent} enabled={enabled}>
        <Animated.View style={[CONTAINER, R_PIECE]}>
          <Image source={PIECES[id]} style={PIECE} />
        </Animated.View>
      </PanGestureHandler>
    </>
  )
}

export default Piece
