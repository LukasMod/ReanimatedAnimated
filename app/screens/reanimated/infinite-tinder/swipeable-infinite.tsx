import React, { useImperativeHandle, Ref } from "react"
import { observer } from "mobx-react-lite"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { ViewStyle } from "react-native"
import { snapPoint } from "react-native-redash"
import { OUT_OF_SCREEN, Profile, SCREEN_WIDTH } from "./profile"
import { ProfileModel } from "./db"

const snapPoints = [-OUT_OF_SCREEN, 0, OUT_OF_SCREEN]

const swipe = (
  translateX: Animated.SharedValue<number>,
  dest: number,
  velocity: number,
  onSwipe: () => void,
) => {
  "worklet"
  translateX.value = withSpring(
    dest,
    {
      velocity,
      restSpeedThreshold: dest === 0 ? 0.01 : 100,
      restDisplacementThreshold: dest === 0 ? 0.01 : 100,
    },
    () => {
      if (dest !== 0) {
        runOnJS(onSwipe)()
      }
    },
  )
}

export interface SwipeInfiniteHandler {
  swipeLeft: () => void
  swipeRight: () => void
}

type Offset = {
  x: number
  y: number
}

export interface SwipeableInfiniteProps {
  onSwipe: () => void
  profile: ProfileModel
  onTop: boolean
  scale: Animated.SharedValue<number>
  extraRightOffset: Animated.SharedValue<number>
  index: number
}

export const SwipeableInfinite = observer(
  function SwipeableInfinite(props: SwipeableInfiniteProps, ref: Ref<SwipeInfiniteHandler>) {
    const { profile, onSwipe, onTop, scale, index, extraRightOffset } = props

    const OVERLAY: ViewStyle = {
      position: "absolute",
      flex: 1,
      width: "80%",
      height: "80%",
    }

    const rOVERLAY = useAnimatedStyle(() => {
      return {
        right: 10 * index + extraRightOffset.value,
      }
    })

    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)

    useImperativeHandle(ref, () => ({
      swipeLeft: () => {
        swipe(translateX, -OUT_OF_SCREEN, 5, onSwipe)
      },
      swipeRight: () => {
        swipe(translateX, OUT_OF_SCREEN, 5, onSwipe)
      },
    }))

    const onPanGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, Offset>({
      onStart: (event, ctx) => {
        ctx.x = translateX.value
        ctx.y = translateY.value
      },
      onActive: (event, ctx) => {
        translateX.value = event.translationX + ctx.x
        translateY.value = event.translationY + ctx.y
        scale.value = interpolate(
          translateX.value,
          [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
          [1, 1, 1],
          Extrapolate.CLAMP,
        )
      },
      onEnd: (event, ctx) => {
        const dest = snapPoint(translateX.value, event.velocityX, snapPoints)
        swipe(translateX, dest, event.velocityX, onSwipe)
        translateY.value = withSpring(0, { velocity: event.velocityY })
      },
    })

    return (
      <PanGestureHandler onGestureEvent={onPanGesture} enabled={onTop}>
        <Animated.View style={[OVERLAY, rOVERLAY]}>
          <Profile
            profile={profile}
            onTop={onTop}
            translateX={translateX}
            translateY={translateY}
            scale={scale}
            index={10 * index + extraRightOffset.value}
          />
        </Animated.View>
      </PanGestureHandler>
    )
  },
  {
    forwardRef: true,
  },
)
