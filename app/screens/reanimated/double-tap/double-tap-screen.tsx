import React, { useRef, useCallback } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions, TextStyle, Image, ImageStyle, ImageBackground } from "react-native"
import { Header, Screen } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import { TapGestureHandler } from "react-native-gesture-handler"

// https://www.youtube.com/watch?v=nbEmo0zLJjw

const ROOT: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const { width: SIZE } = Dimensions.get("window")

const HEADER_ABSOLUTE: ViewStyle = {
  position: "absolute",
  width: "100%",
  top: 20,
  height: 70,
  elevation: 2,
  zIndex: 2,
}

const TEXT: TextStyle = {
  fontSize: 70,
  textTransform: "uppercase",
  letterSpacing: 14,
  marginBottom: 30,
}

const IMAGE: ImageStyle = {
  width: SIZE,
  height: SIZE,
}

const IMAGE_HEART: ImageStyle = {
  ...IMAGE,
  tintColor: "white",
  resizeMode: "center",
  shadowOffset: {
    width: 0,
    height: 20,
  },
  shadowRadius: 10,
  shadowOpacity: 0.2,
}

const AnimatedImage = Animated.createAnimatedComponent(Image)

export const DoubleTapScreen = observer(function DoubleTapScreen() {
  const navigation = useNavigation()

  const scale = useSharedValue(0)
  const progress = useSharedValue(1)

  const doubleTapRef = useRef()

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0))
      }
    })
  }, [])

  const onSingleTap = useCallback(() => {
    progress.value = withTiming(0, undefined, (isFinished) => {
      if (isFinished) {
        progress.value = withTiming(1)
      }
    })
  }, [])

  const rHeartStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: Math.max(scale.value, 0) }],
    }
  })

  const rTextStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
    }
  })

  return (
    <Screen style={ROOT} preset="scroll" unsafe>
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="Reanimated Double Tap"
        titleStyle={{ color: palette.black }}
        style={HEADER_ABSOLUTE}
      />
      <TapGestureHandler
        waitFor={doubleTapRef}
        onActivated={(event) => {
          console.log("SINGLE TAP")
          onSingleTap()
        }}
      >
        <TapGestureHandler
          maxDelayMs={250}
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={(event) => {
            console.log("DOUBLE TAP")
            onDoubleTap()
          }}
        >
          <Animated.View>
            <ImageBackground
              style={IMAGE}
              source={require("./karsten-winegeart-60GsdOMRFGc-unsplash.jpg")}
            >
              <AnimatedImage style={[IMAGE_HEART, rHeartStyle]} source={require("./like.png")} />
            </ImageBackground>
            <Animated.Text style={[TEXT, rTextStyle]}>😀😀😀😀😀😀😀😀</Animated.Text>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </Screen>
  )
})
