import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, View, Dimensions } from "react-native"
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { ColorSelectionType, HEADER_HEIGHT } from "./reflectly-color-selection-screen"

const { width, height } = Dimensions.get("window")
const RADIUS = 45
// const MAX_SCALE = 10

interface BackgroundProps {
  colorSelection: ColorSelectionType
}

export const Background = observer(function Background({ colorSelection }: BackgroundProps) {
  const progress = useSharedValue(0)

  const MAX_RADIUS =
    Math.SQRT2 * Math.max(width + colorSelection.position.x, height + colorSelection.position.y)

  useEffect(() => {
    progress.value = 0
    progress.value = withTiming(1, { duration: 650, easing: Easing.inOut(Easing.ease) })
  }, [colorSelection])

  const CONTAINER: ViewStyle = {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colorSelection.previous.start,
  }

  const R_CONTAINER = useAnimatedStyle(() => {
    return {
      top: -RADIUS + colorSelection.position.y,
      left: -RADIUS + colorSelection.position.x,
      borderRadius: RADIUS,
      width: RADIUS * 2,
      height: RADIUS * 2,
      backgroundColor: colorSelection.current.start,
      transform: [{ scale: progress.value * (MAX_RADIUS / RADIUS) }],
    }
  })

  return (
    <View style={CONTAINER}>
      <Animated.View style={R_CONTAINER} />
    </View>
  )
})
