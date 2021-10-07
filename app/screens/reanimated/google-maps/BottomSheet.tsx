/* eslint-disable react-native/no-color-literals */
import React from "react"
import { SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"

type ContextType = {
  startY: number
}

export default function BottomSheet({ panY }) {
  const { height } = useWindowDimensions()

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>(
    {
      onStart(_, context) {
        context.startY = panY.value
      },
      onActive(event, context) {
        panY.value = context.startY + event.translationY
      },
      onEnd() {
        if (panY.value < -height * 0.4) {
          panY.value = withTiming(-(height * 0.6))
        } else {
          panY.value = withTiming(0)
        }
      },
    },
    [height],
  )

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(panY.value, [-1, 0], [-1, 0], {
            extrapolateLeft: Extrapolate.EXTEND,
            extrapolateRight: Extrapolate.CLAMP,
          }),
        },
      ],
    }
  })

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, { top: height * 0.9 }, animatedStyle]}>
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.content}>
            <Text style={styles.title}>Maison Paul Bocuse</Text>
            <View style={styles.fakeContent} />
          </View>
        </SafeAreaView>
      </Animated.View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    left: 0,
    position: "absolute",
    right: 0,
    shadowColor: "black",
    shadowOffset: {
      height: -6,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    top: 0,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  fakeContent: {
    flex: 1,
    height: 1000,
  },
  title: {
    fontSize: 22,
    fontWeight: "400",
  },
  wrapper: {
    flex: 1,
  },
})
