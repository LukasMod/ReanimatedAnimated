import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Header, Screen } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"
import Board from "./Board"

// https://www.youtube.com/watch?v=JulJJxbP_T0&list=PLkOyNuxGl9jxB_ARphTDoOWf5AE1J-x1r&index=5

const ROOT: ViewStyle = {
  flex: 1,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgb(36, 35, 32)",
}

export const ChessGameScreen = observer(function ChessGameScreen() {
  const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="Reanimated Chess Game"
        titleStyle={{ color: palette.black }}
      />
      <View style={CONTAINER}>
        <Board />
      </View>
    </Screen>
  )
})
