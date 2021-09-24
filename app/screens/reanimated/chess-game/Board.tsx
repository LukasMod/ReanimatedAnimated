import React, { useRef, useState, useCallback } from "react"
import { View, Dimensions, ViewStyle, TextStyle } from "react-native"
import { Chess } from "chess.js"

import Background from "./Background"
import Piece from "./Piece"
import { SIZE } from "./Notation"
import { Text } from "../../../components"
import { palette } from "../../../theme/palette"
import { spacing } from "../../../theme"

const { width } = Dimensions.get("window")

function useConst<T>(initialValue: T | (() => T)): T {
  const ref = useRef<{ value: T }>()
  if (ref.current === undefined) {
    // Box the value in an object so we can tell if it's initialized even if the initializer
    // returns/is undefined
    ref.current = {
      value:
        typeof initialValue === "function"
          ? // eslint-disable-next-line @typescript-eslint/ban-types
            (initialValue as Function)()
          : initialValue,
    }
  }
  return ref.current.value
}

const CONTAINER: ViewStyle = {
  backgroundColor: palette.lightGrey,
  flex: 1,
  justifyContent: "center",
}
const CONTAINER_BOARD: ViewStyle = {
  height: width,
  width,
}

const TEXT: TextStyle = {
  color: palette.white,
  fontSize: 40,
  textAlign: "center",
  marginVertical: spacing[4],
}

type Type = "q" | "r" | "n" | "b" | "k" | "p"
type Player = "b" | "w"

interface SquareProp {
  color: Player
  type: Type
}

const Board = () => {
  const chess = useConst(() => new Chess())
  const [state, setState] = useState({
    player: "w",
    board: chess.board(),
  })

  const onTurn = useCallback(() => {
    setState({ player: state.player === "w" ? "b" : "w", board: chess.board() })
  }, [chess, state.player])

  return (
    <View style={CONTAINER}>
      {state.player === "b" ? (
        <Text text="BLACK TURN" style={[TEXT, { color: "black" }]} />
      ) : (
        <Text text=" " style={TEXT} />
      )}
      <View style={CONTAINER_BOARD}>
        <Background />
        {state.board.map((row, i) =>
          row.map((square: SquareProp, j) => {
            if (square === null) {
              return null
            }
            return (
              <Piece
                key={`${square.color}${square.type}-${i}-${j}`}
                id={`${square.color}${square.type}`}
                position={{ x: j * SIZE, y: i * SIZE }}
                chess={chess}
                onTurn={onTurn}
                enabled={state.player === square.color}
              />
            )
          }),
        )}
      </View>
      {state.player === "w" ? (
        <Text text="WHITE TURN" style={TEXT} />
      ) : (
        <Text text=" " style={TEXT} />
      )}
    </View>
  )
}

export default Board
