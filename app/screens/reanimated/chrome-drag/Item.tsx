import React, { ReactNode, RefObject } from "react"
import { Dimensions, View, ViewStyle, StyleSheet } from "react-native"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  scrollTo,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
// import { scrollTo } from "react-native-redash"

import { animationConfig, COL, getOrder, getPosition, Positions, SIZE } from "./Config"

interface ItemProps {
  children: ReactNode
  id: string
  positions: Animated.SharedValue<Positions>
  scrollView: RefObject<Animated.ScrollView>
  scrollY: Animated.SharedValue<number>
}

const Item = ({ children, positions, id, scrollView, scrollY }: ItemProps) => {
  const inset = useSafeAreaInsets()
  const containerHeight = Dimensions.get("window").height - inset.top - inset.bottom
  const contentHeight = (Object.keys(positions.value).length / COL) * SIZE
  const isGestureActive = useSharedValue(false)

  const position = getPosition(positions.value[id])

  const translateX = useSharedValue(position.x)
  const translateY = useSharedValue(position.y)

  useAnimatedReaction(
    () => positions.value[id],
    (newOrder) => {
      const newPosition = getPosition(newOrder)
      translateX.value = withTiming(newPosition.x, animationConfig)
      translateY.value = withTiming(newPosition.y, animationConfig)
    },
  )

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (event, ctx) => {
      isGestureActive.value = true
      ctx.x = translateX.value
      ctx.y = translateY.value
    },
    onActive: (event, ctx) => {
      translateX.value = event.translationX + ctx.x
      translateY.value = event.translationY + ctx.y

      const oldOrder = positions.value[id]
      const newOrder = getOrder(translateX.value, translateY.value)

      if (oldOrder !== newOrder) {
        // element id we want to swap
        const idToSwap = Object.keys(positions.value).find(
          (key) => positions.value[key] === newOrder,
        )

        if (idToSwap) {
          // we need to clone object but cant use ... (cant be used in worklets) or Object.assign (problems on IOS)
          const newPositions = JSON.parse(JSON.stringify(positions.value))
          newPositions[id] = newOrder
          newPositions[idToSwap] = oldOrder
          positions.value = newPositions
        }
      }

      const lowerBound = scrollY.value
      const upperBound = lowerBound + containerHeight - SIZE
      const maxScroll = contentHeight - containerHeight
      const scrollLeft = maxScroll - scrollY.value

      if (translateY.value < lowerBound) {
        const diff = Math.min(lowerBound - translateY.value, lowerBound)
        scrollY.value -= diff
        ctx.y -= diff
        translateY.value = event.translationY + ctx.y
        scrollTo(scrollView, 0, scrollY.value, false)
      }
      if (translateY.value > upperBound) {
        const diff = Math.min(translateY.value - upperBound, scrollLeft)
        scrollY.value += diff
        ctx.y += diff
        translateY.value = event.translationY + ctx.y
        scrollTo(scrollView, 0, scrollY.value, false)
      }
      // console.log(translateY.value)
    },
    onEnd: (event, ctx) => {
      const destination = getPosition(positions.value[id])
      translateX.value = withTiming(
        destination.x,
        animationConfig,
        () => (isGestureActive.value = false),
      )
      translateY.value = withTiming(destination.y, animationConfig)
    },
  })

  const R_ITEM = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 100 : 0
    const scale = withSpring(isGestureActive.value ? 1.1 : 1)
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: SIZE,
      height: SIZE,
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale }],
      zIndex,
    }
  })

  return (
    <Animated.View style={R_ITEM}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
}

export default Item
