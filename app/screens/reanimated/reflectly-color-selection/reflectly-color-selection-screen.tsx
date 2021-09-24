import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Header } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"
import { Color, COLOR_WIDTH } from "./color"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { snapPoint } from "react-native-redash"
import { Background } from "./background"
// import { BackgroundGL as Background } from "./backgroundGL"

// https://www.youtube.com/watch?v=52luoBZC0Uw&list=PLkOyNuxGl9jxB_ARphTDoOWf5AE1J-x1r&index=7

export type ColorType = { id: number; start: string; end: string }
export type ColorSelectionType = {
  previous: ColorType
  current: ColorType
  position: { x: number; y: number }
}

const colors: ColorType[] = [
  {
    id: 0,
    start: "#00E0D3",
    end: "#00B4D4",
  },
  {
    id: 1,
    start: "#00B4D4",
    end: "#409CAE",
  },
  {
    id: 2,
    start: "#66D8A4",
    end: "#409CAE",
  },
  {
    id: 3,
    start: "#FC727B",
    end: "#F468A0",
  },
  {
    id: 4,
    start: "#8289EA",
    end: "#7A6FC1",
  },
  {
    id: 5,
    start: "#FEC7A3",
    end: "#FD9F9C",
  },
]

const snapPoints = colors.map((color, index) => -COLOR_WIDTH * index)

export const HEADER_HEIGHT = 70

const ROOT: ViewStyle = {
  flex: 1,
}
const HEADER_STYLE: ViewStyle = {
  position: "absolute",
  width: "100%",
  top: 20,
  height: HEADER_HEIGHT,
  elevation: 2,
  zIndex: 2,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: palette.lighterGrey,
}
const PLACEHOLDER: ViewStyle = {
  width: COLOR_WIDTH,
}

export const ReflectlyColorSelectionScreen = observer(function ReflectlyColorSelectionScreen() {
  const navigation = useNavigation()

  const [colorSelection, setColorSelection] = useState<ColorSelectionType>({
    previous: colors[0],
    current: colors[0],
    position: { x: 0, y: 0 },
  })

  const translateX = useSharedValue(0)
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { offsetX: number }
  >({
    onStart: (event, ctx) => {
      ctx.offsetX = translateX.value
    },

    onActive: ({ translationX }, ctx) => {
      translateX.value = translationX + ctx.offsetX
    },
    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints)
      translateX.value = withSpring(dest)
    },
  })

  return (
    <View style={ROOT}>
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="Reanimated Reflectly Color Selection"
        titleStyle={{ color: palette.black }}
        style={HEADER_STYLE}
      />
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={CONTAINER}>
          <Background colorSelection={colorSelection} />
          <View style={PLACEHOLDER} />
          {colors.map((color, index) => {
            return (
              <Color
                key={index}
                color={color}
                translateX={translateX}
                index={index}
                onPress={(position) => {
                  translateX.value = withSpring(-index * COLOR_WIDTH)
                  setColorSelection({ position, previous: colorSelection.current, current: color })
                }}
              />
            )
          })}
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
})
