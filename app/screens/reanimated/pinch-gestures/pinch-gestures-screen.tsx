import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions, Image, ImageStyle, StyleSheet } from "react-native"
import { Header, Screen } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { PinchGestureHandler, PinchGestureHandlerGestureEvent } from "react-native-gesture-handler"

// https://www.youtube.com/watch?v=R7vyLItMQJw&list=PLjHsmVtnAr9TWoMAh-3QMiP7bPUqPFuFZ&index=5

const IMAGE_URL =
  "https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
const ROOT: ViewStyle = {
  flex: 1,
}

const { width, height } = Dimensions.get("window")

const CONTAINER: ViewStyle = {
  flex: 1,
}

const HEADER_ABSOLUTE: ViewStyle = {
  position: "absolute",
  width: "100%",
  top: 20,
  height: 70,
  elevation: 2,
  zIndex: 2,
}

const IMAGE: ImageStyle = {
  flex: 1,
}

const SIZE_FOCAL = 25

const FOCAL: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  width: SIZE_FOCAL,
  height: SIZE_FOCAL,
  backgroundColor: "blue",
  borderRadius: 25,
}

const AnimatedImage = Animated.createAnimatedComponent(Image)

export const PinchGesturesScreen = observer(function PinchGesturesScreen() {
  const navigation = useNavigation()

  const scale = useSharedValue(1)
  const focalX = useSharedValue(0)
  const focalY = useSharedValue(0)

  const pinchGestureHandler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
    onActive: (event) => {
      console.log(event)
      scale.value = event.scale
      focalX.value = event.focalX
      focalY.value = event.focalY
    },
    onEnd: (event) => {
      scale.value = withTiming(1)
    },
  })

  const rImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -width / 2 },
        { translateY: -height / 2 },

        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ],
    }
  })

  const rFocalStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: focalX.value }, { translateY: focalY.value }] }
  })

  return (
    <Screen style={ROOT} preset="scroll" unsafe>
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="Reanimated Pinch Gestures"
        titleStyle={{ color: palette.black }}
        style={HEADER_ABSOLUTE}
      />
      <PinchGestureHandler onGestureEvent={pinchGestureHandler}>
        <Animated.View style={CONTAINER}>
          <AnimatedImage style={[IMAGE, rImageStyle]} source={{ uri: IMAGE_URL }} />
          <Animated.View style={[FOCAL, rFocalStyle]} />
        </Animated.View>
      </PinchGestureHandler>
    </Screen>
  )
})
