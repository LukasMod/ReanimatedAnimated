import { NavigationProp, RouteProp } from "@react-navigation/native"
import React from "react"
import { StyleSheet, Dimensions, ViewStyle } from "react-native"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import { SharedElement } from "react-navigation-shared-element"
import { Video } from "expo-av"

import { SnapchatRoutes } from "./Model"
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import { snapPoint } from "react-native-redash"

interface StoryProps {
  navigation: NavigationProp<SnapchatRoutes, "Story">
  route: RouteProp<SnapchatRoutes, "Story">
}

const { height } = Dimensions.get("window")

const FULL: ViewStyle = {
  flex: 1,
}

type ContextType = {
  x: number
  y: number
}

const AnimatedVideo = Animated.createAnimatedComponent(Video)

const Story = ({ route, navigation }: StoryProps) => {
  const { story } = route.params

  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const isGestureActive = useSharedValue(false)

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (event, ctx) => {
      isGestureActive.value = true
    },
    onActive: (event, ctx) => {
      translateX.value = event.translationX
      translateY.value = event.translationY
    },
    onEnd: (event, ctx) => {
      const goBack = snapPoint(translateY.value, event.velocityY, [0, height]) === height

      if (goBack) {
        runOnJS(navigation.goBack)()
      } else {
        translateX.value = withSpring(0, { velocity: event.velocityX })
        translateY.value = withSpring(0, { velocity: event.velocityY })
      }
      isGestureActive.value = false
    },
  })

  const R_CONTAINER = useAnimatedStyle(() => {
    const scale = interpolate(translateY.value, [0, height], [1, 0.5], Extrapolate.CLAMP)

    return {
      transform: [
        { translateX: translateX.value * scale },
        { translateY: translateY.value * scale },
        { scale },
      ],
    }
  })

  const R_BORDER = useAnimatedStyle(() => {
    return {
      borderRadius: withTiming(isGestureActive.value ? 24 : 0),
    }
  })

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[FULL, R_CONTAINER]}>
        <SharedElement id={story.id} style={FULL}>
          {!story.video && (
            <Animated.Image
              source={story.source}
              style={[
                {
                  ...StyleSheet.absoluteFillObject,
                  width: undefined,
                  height: undefined,
                },
                R_BORDER,
              ]}
            />
          )}
          {story.video && (
            <AnimatedVideo
              source={story.video}
              rate={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={[StyleSheet.absoluteFill, R_BORDER]}
            />
          )}
        </SharedElement>
      </Animated.View>
    </PanGestureHandler>
  )
}

export default Story
