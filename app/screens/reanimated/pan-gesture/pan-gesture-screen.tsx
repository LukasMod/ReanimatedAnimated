import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Header, Screen } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"

// https://www.youtube.com/watch?v=4HUreYYoE6U&list=PLjHsmVtnAr9TWoMAh-3QMiP7bPUqPFuFZ&index=2

const SIZE = 100
const CIRCLE_RADIUS = 90 * 2

const ROOT: ViewStyle = {
  flex: 1,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const SQUARE: ViewStyle = {
  height: SIZE,
  width: SIZE,
  backgroundColor: "rgba(0,0,256,0.5)",
  borderRadius: 20,
}

const CIRCLE: ViewStyle = {
  height: CIRCLE_RADIUS * 2,
  width: CIRCLE_RADIUS * 2,
  borderRadius: CIRCLE_RADIUS,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 5,
  borderColor: "rgba(0,0,256,0.5)",
}

type ContextType = {
  translateX: number
  translateY: number
}

export const PanGestureScreen = observer(function PanGestureScreen() {
  const navigation = useNavigation()

  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (event, context) => {
      context.translateX = translateX.value
      context.translateY = translateY.value
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX
      translateY.value = event.translationY + context.translateY
    },
    onEnd: (event, context) => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2)

      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0)
        translateY.value = withSpring(0)
      }
    },
  })

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    }
  })

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="Reanimated Pan Gestures"
        titleStyle={{ color: palette.black }}
      />
      <View style={CONTAINER}>
        <View style={CIRCLE}>
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={[SQUARE, rStyle]} />
          </PanGestureHandler>
        </View>
      </View>
    </Screen>
  )
})
