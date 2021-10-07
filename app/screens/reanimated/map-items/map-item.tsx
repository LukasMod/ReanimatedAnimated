/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/no-color-literals */
import React from "react"
import { Dimensions, StyleSheet, Text, ViewStyle } from "react-native"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated"
import { LIST_MARGIN, MAX_HEIGHT } from "./map-list"

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const ITEM_WIDTH = SCREEN_WIDTH * 0.84
export const ITEM_HEIGHT = 200
export const ITEM_MARGIN = SCREEN_WIDTH * 0.02
export const INPUT_RANGE_FULL = [-MAX_HEIGHT, 0]

export default function MapItem(props) {
  const {
    data: { id, title, backgroundColor },
    index,
    opened,
    setIsGestureActive,
    isGestureActive,
    panY,
  } = props

  const isItemOpened = useDerivedValue(() => panY.value < -250)

  const CONTAINER: ViewStyle = {
    // backgroundColor: `rgba(0,0,256, 0.${index + 2})`,
    backgroundColor: backgroundColor,
    flex: 0,
    height: ITEM_HEIGHT,
  }

  type ContextType = {
    startY: number
  }

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>(
    {
      onStart(_, context) {
        context.startY = panY.value
        // runOnJS(setIsGestureActive)(true)
      },
      onActive(event, context) {
        panY.value = context.startY + event.translationY
        if (panY.value < -100 && !isGestureActive) {
          // console.log(`${Platform.OS === "ios" ? "IPHONE" : "ANDROID"} `, y.value)
          runOnJS(setIsGestureActive)(true)
        }
      },
      onEnd() {
        if (panY.value < -SCREEN_HEIGHT * 0.4) {
          panY.value = withTiming(-(SCREEN_HEIGHT * 0.6))
        } else {
          panY.value = withTiming(0, {}, () => {
            runOnJS(setIsGestureActive)(false)
          })
        }
      },
    },
    [SCREEN_HEIGHT],
  )

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        panY.value,
        [-MAX_HEIGHT, 0],
        [SCREEN_WIDTH, ITEM_WIDTH],
        Extrapolate.CLAMP,
      ),
      left: interpolate(
        panY.value,
        [-MAX_HEIGHT, 0],
        [-(ITEM_MARGIN * 2 + LIST_MARGIN * 3), 0],
        Extrapolate.CLAMP,
      ),
      opacity: opened ? 1 : interpolate(panY.value, [-150, 0], [0, 1]),
      height: interpolate(panY.value, [-MAX_HEIGHT, 0], [MAX_HEIGHT, ITEM_HEIGHT]),
    }
  })
  const ANIMATED_CONTENT1 = useAnimatedStyle(() => {
    return {
      opacity: interpolate(panY.value, [-MAX_HEIGHT, 0], [0, 1]),
    }
  })
  const ANIMATED_CONTENT2 = useAnimatedStyle(() => {
    return {
      opacity: interpolate(panY.value, [-MAX_HEIGHT, 0], [1, 0]),
    }
  })

  return (
    <PanGestureHandler onGestureEvent={gestureHandler} activeOffsetY={[-20, 20]}>
      <Animated.View style={[CONTAINER, animatedStyle]}>
        <Animated.View style={[styles.content, ANIMATED_CONTENT1]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.title}>{id}</Text>
          <Text style={styles.title}>{index}</Text>
          <Text style={styles.title}>{opened.toString()}</Text>
        </Animated.View>

        <Animated.View style={[styles.content, ANIMATED_CONTENT2]}>
          <Text style={styles.title}>ANOTHER TITLE</Text>
          <Text style={styles.title}>ANOTHER ID</Text>
          <Text style={styles.title}>ANOTHER INDEX</Text>
          <Text style={styles.title}>CONTENT BIG</Text>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    position: "absolute",
  },
  title: {
    fontSize: 22,
    fontWeight: "400",
  },
})
