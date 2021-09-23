import React, { useCallback } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Dimensions } from "react-native"
import { Header, Screen } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated"
import { ColorPicker } from "./color-picker"

// https://www.youtube.com/watch?v=XH35ahDm3as

const { width } = Dimensions.get("window")

const BACKGROUND_COLOR = "rgba(0,0,0,0.9)"
const COLORS = ["red", "purple", "blue", "cyan", "green", "yellow", "orange", "black", "white"]
const PICKER_WIDTH = 0.9 * width
const CIRCLE_SIZE = 0.6 * width

const ROOT: ViewStyle = {
  flex: 1,
}

const HEADER_ABSOLUTE: ViewStyle = {
  position: "absolute",
  width: "100%",
  top: 20,
  height: 70,
  elevation: 2,
  zIndex: 2,
}

const TOP_CONTAINER: ViewStyle = {
  flex: 3,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: BACKGROUND_COLOR,
}

const BOTTOM_CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: BACKGROUND_COLOR,
}

const COLOR_PICKER: ViewStyle = {
  height: 40,
  width: PICKER_WIDTH,
  borderRadius: 20,
}

const CIRCLE: ViewStyle = {
  height: CIRCLE_SIZE,
  width: CIRCLE_SIZE,
  borderRadius: CIRCLE_SIZE / 2,
  backgroundColor: "#fff",
}

export const ColorPickerScreen = observer(function ColorPickerScreen() {
  const navigation = useNavigation()

  const pickedColor = useSharedValue<string | number>(COLORS[0])

  const onColorChanged = useCallback((color: string | number) => {
    "worklet"
    pickedColor.value = color
  }, [])

  const rCircleStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value,
    }
  })

  return (
    <Screen style={ROOT} preset="scroll" unsafe>
      <Header onLeftPress={() => navigation.goBack()} leftIcon={"back"} style={HEADER_ABSOLUTE} />
      <View style={TOP_CONTAINER}>
        <Animated.View style={[CIRCLE, rCircleStyle]} />
      </View>
      <View style={BOTTOM_CONTAINER}>
        <ColorPicker
          style={COLOR_PICKER}
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          maxWidth={PICKER_WIDTH}
          onColorChanged={onColorChanged}
        />
      </View>
    </Screen>
  )
})
