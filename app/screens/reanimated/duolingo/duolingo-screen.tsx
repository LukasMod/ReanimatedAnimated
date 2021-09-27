import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Header as MainHeader, Screen } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

import WordList from "./WordList"
import Word from "./Word"
import  Header from "./components/Header"
import Footer from "./components/Footer"

import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"

// https://www.youtube.com/watch?v=tHWGKdpj1rs&list=PLkOyNuxGl9jxB_ARphTDoOWf5AE1J-x1r&index=12

const SIZE = 100
const CIRCLE_RADIUS = 90 * 2

const ROOT: ViewStyle = {
  flex: 1,
}

const CONTAINER: ViewStyle = {
  backgroundColor: "white",
  flex: 1,
  // flexGrow: 1
}

const words = [
  { id: 1, word: "Ihr" },
  { id: 8, word: "hungrig" },
  { id: 2, word: "isst" },
  { id: 7, word: "er" },
  { id: 6, word: "weil" },
  { id: 9, word: "ist" },
  { id: 5, word: "," },
  { id: 3, word: "einen" },
  { id: 4, word: "Apfel" },
]

export const DuolingoScreen = observer(function DuolingoScreen() {
  const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="scroll">
      <MainHeader
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="Reanimated Duolingo"
        titleStyle={{ color: palette.black }}
      />
      <View style={CONTAINER}>
        <Header />
        <WordList>
          {words.map((word) => (
            <Word key={word.id} {...word} />
          ))}
        </WordList>
        <Footer />
      </View>
    </Screen>
  )
})
