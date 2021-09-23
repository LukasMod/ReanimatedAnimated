import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient"
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler"
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated"

const CIRCLE_PICKER_SIZE = 45

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const PICKER: ViewStyle = {
  position: "absolute",
  width: CIRCLE_PICKER_SIZE,
  height: CIRCLE_PICKER_SIZE,
}

const INTERNAL_PICKER: ViewStyle = {
  flex: 1,
  borderRadius: CIRCLE_PICKER_SIZE / 2,
  borderWidth: 3,
  borderColor: "#fff",
}

type ContextType = {
  x: number
}

export interface ColorPickerProps extends LinearGradientProps {
  style?: StyleProp<ViewStyle>
  maxWidth: number
  onColorChanged: (color: string | number) => void
}

export const ColorPicker = observer(function ColorPicker(props: ColorPickerProps) {
  const { style, colors, start, end, maxWidth, onColorChanged } = props

  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const scale = useSharedValue(1)

  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(Math.max(translateX.value, 0), maxWidth - CIRCLE_PICKER_SIZE)
  })

  const onEnd = React.useCallback(() => {
    "worklet"
    translateY.value = withTiming(0, { duration: 200 })
    scale.value = withTiming(1, { duration: 200 })
  }, [])

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (event, context) => {
      context.x = adjustedTranslateX.value
      // translateY.value = withTiming(-CIRCLE_PICKER_SIZE, { duration: 200 })
      // scale.value = withTiming(1.2, { duration: 200 })
    },
    onActive: (event, context) => {
      // console.log("event", event.translationX)
      translateX.value = event.translationX + context.x
    },
    onEnd,
  })

  const tapGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent, ContextType>({
    onStart: (event, context) => {
      translateY.value = withTiming(-CIRCLE_PICKER_SIZE, { duration: 200 })
      scale.value = withTiming(1.2, { duration: 200 })
      translateX.value = withTiming(event.absoluteX - CIRCLE_PICKER_SIZE, { duration: 200 })
    },

    onEnd,
  })

  const rPickerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: adjustedTranslateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    }
  })

  const rInternalPickerStyle = useAnimatedStyle(() => {
    const inputRange = colors.map((_, index) => (index / colors.length) * maxWidth)

    const backgroundColor = interpolateColor(translateX.value, inputRange, colors)

    onColorChanged?.(backgroundColor)

    return {
      backgroundColor,
    }
  })

  return (
    <TapGestureHandler onGestureEvent={tapGestureEvent}>
      <Animated.View>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={CONTAINER}>
            <LinearGradient colors={colors} start={start} end={end} style={style} />
            <Animated.View style={[PICKER, rPickerStyle]}>
              <Animated.View style={[INTERNAL_PICKER, rInternalPickerStyle]}></Animated.View>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  )
})
