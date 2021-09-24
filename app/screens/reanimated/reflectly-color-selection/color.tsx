import React from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, ViewStyle } from "react-native"
import { ColorType } from "./reflectly-color-selection-screen"
import { LinearGradient } from "expo-linear-gradient"
import { palette } from "../../../theme/palette"
import Animated, {
    Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated"
import { TapGestureHandler, TapGestureHandlerGestureEvent } from "react-native-gesture-handler"

const { width } = Dimensions.get("window")
export const COLOR_WIDTH = width / 3
const RADIUS = 45

const CONTAINER: ViewStyle = {
  width: COLOR_WIDTH,
  alignItems: "center",
}
const GRADIENT: ViewStyle = {
  width: RADIUS * 2,
  height: RADIUS * 2,
  borderRadius: RADIUS,
  borderWidth: 6,
  borderColor: palette.white,
}

interface ColorProps {
  color: ColorType
  translateX: Animated.SharedValue<number>
  index: number
  onPress: (position: { x: number; y: number }) => void
}

export const Color = observer(function Color({ color, translateX, index, onPress }: ColorProps) {
  const inputRange = [-COLOR_WIDTH * (index + 1), -COLOR_WIDTH * index, -COLOR_WIDTH * (index - 1)]

  const R_CONTAINER = useAnimatedStyle(() => {
    const angle = interpolate(
      translateX.value,
      inputRange,
      [0, Math.PI / 2, Math.PI],
      Extrapolate.CLAMP,
    )

    const translateY = 100 * Math.cos(angle)
    const scale = 0.8 + 0.2 * Math.sin(angle)

    return { transform: [{ translateX: translateX.value }, { translateY }, { scale }] }
  })

  const onGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onActive: ({ absoluteX: x, absoluteY: y }) => {
      runOnJS(onPress)({ x, y })
    },
  })

  return (
    <Animated.View style={[CONTAINER, R_CONTAINER]}>
      <TapGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View>
          <LinearGradient style={GRADIENT} colors={[color.start, color.end]} />
        </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  )
})
