import * as React from "react"
import { StyleProp, TextStyle, ViewStyle, Dimensions, View } from "react-native"
import { observer } from "mobx-react-lite"
import { flatten } from "ramda"
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated"
import { Text } from "../../../components"

const { height, width } = Dimensions.get("window")

const SIZE = width * 0.7

const CONTAINER: ViewStyle = {
  width,
  height,
  alignItems: "center",
  justifyContent: "center",
}
const SQUARE: ViewStyle = {
  width: SIZE,
  height: SIZE,
  backgroundColor: "rgba(0, 0, 256, 0.4)",
}
const TEXT_CONTAINER: ViewStyle = {
  position: "absolute",
}

const TEXT: TextStyle = {
  fontSize: 50,
  color: "white",
  textTransform: "uppercase",
  fontWeight: "700",
}

export interface ReanimatedCustomScrollViewPageProps {
  style?: StyleProp<ViewStyle>
  title: string
  index: number
  translateX: Animated.SharedValue<number>
}

export const ScrollViewPage = observer(function ScrollViewPage(
  props: ReanimatedCustomScrollViewPageProps,
) {
  const { style, title, index, translateX } = props
  const styles = flatten([CONTAINER, style])

  const inputRange = [(-index - 1) * width, index * width, (index + 1) * width]

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(translateX.value, inputRange, [0, 1, 0], Extrapolate.CLAMP)

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    )

    return {
      borderRadius,
      transform: [{ scale }],
    }
  })

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP,
    )

    const opacity = interpolate(translateX.value, inputRange, [-2, 1, -2], Extrapolate.CLAMP)

    return {
      opacity,
      transform: [{ translateY: translateY }],
    }
  })

  return (
    <View style={[CONTAINER, { backgroundColor: `rgba(0,0,256, 0.${index + 2})` }]}>
      <Animated.View style={[SQUARE, rStyle]} />
      <Animated.View style={[TEXT_CONTAINER, rTextStyle]}>
        <Text style={TEXT}>{title}</Text>
      </Animated.View>
    </View>
  )
})
