import React from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, View, ViewStyle } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated"
import { starCount, StarData } from "./starData"

const RADIUS = 50

const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

interface StarProps extends StarData {
  time: Animated.SharedValue<number>
}

export const Star = observer(function Star({ time, x, y, id }: StarProps) {
  const STAR: ViewStyle = {
    left: x,
    top: y,
    width: 10,
    height: 10,
    backgroundColor: "white",
  }

  const R_STAR = useAnimatedStyle(() => {
    // const x = Math.sin(time.value * 2 + id) * RADIUS
    // const y = Math.cos(time.value * 2 + id) * RADIUS
    // return {
    //   left: x + x,
    //   top: y + y,
    // }

    const z = id / starCount
    const depth = (z + time.value) % 1
    const invZp = 0.4 / (1 - depth) 

    return {
      //   left: x + x,
      //   top: y + y,
      transform: [
        { translateX: windowWidth * (0.5 + x * invZp) },
        { translateY: windowHeight * (0.1 + y * invZp) },
        { scaleX: depth },
        { scaleY: depth },
      ],
    }
  })

  return <Animated.View style={[STAR, R_STAR]} />
})
