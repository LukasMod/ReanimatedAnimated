import React from "react"
import { View, StyleSheet, Image, Dimensions, ViewStyle } from "react-native"
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated"

import { products } from "./Model"

const { width } = Dimensions.get("window")
const SIZE = 200

const CONTAINER: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  alignItems: "center",
  justifyContent: "center",
}

interface IProducts {
  x: Animated.SharedValue<number>
}

const Products = ({ x }: IProducts) => {
  return (
    <View style={CONTAINER} pointerEvents="none">
      {products.map((product, index) => {
        const R_CONTAINER = useAnimatedStyle(() => {
          const inputRange = [width * (index - 1), width * index, width * (index + 1)]
          const translateX = interpolate(x.value, inputRange, [width / 2, 0, -width / 2])
          const scale = interpolate(x.value, inputRange, [0.75, 1, 0.75])
          return {
            transform: [{ translateX }, { scale }],
          }
        })

        return (
          <Animated.View key={index} style={[CONTAINER, R_CONTAINER]}>
            <Image
              source={product.picture}
              style={{ width: SIZE, height: SIZE * product.aspectRatio }}
            />
          </Animated.View>
        )
      })}
    </View>
  )
}

export default Products
