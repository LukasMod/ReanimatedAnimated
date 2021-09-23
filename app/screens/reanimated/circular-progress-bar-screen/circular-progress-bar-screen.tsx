import React, { useCallback } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions, TextStyle, TouchableOpacity } from "react-native"
import { Header, Screen, Text } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"
import Animated, {
  useDerivedValue,
  useSharedValue,
  withTiming,
  useAnimatedProps,
} from "react-native-reanimated"
import Svg, { Circle } from "react-native-svg"
import { ReText } from "react-native-redash"

// https://www.youtube.com/watch?v=9n2mQJ7TO6Y

const { width, height } = Dimensions.get("window")

const CIRCLE_LENGTH = 1000 // 2PI * R
const R = CIRCLE_LENGTH / (2 * Math.PI)

const BACKGROUND_COLOR = "#444B6F"
const BACKGROUND_STROKE_COLOR = "#303858"
const STROKE_COLOR = "#A6E1FA"

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: BACKGROUND_COLOR,
  justifyContent: "center",
  alignItems: "center",
}

const TEXT: TextStyle = {
  fontSize: 80,
  color: "rgba(256,256,256,0.7)",
}

const HEADER_ABSOLUTE: ViewStyle = {
  position: "absolute",
  width: "100%",
  top: 20,
  height: 70,
  elevation: 2,
  zIndex: 2,
}

const CIRCLE: ViewStyle = {
  position: "absolute",
}

const BUTTON: ViewStyle = {
  position: "absolute",
  bottom: 80,
  backgroundColor: BACKGROUND_STROKE_COLOR,
  width: width * 0.7,
  height: 60,
  borderRadius: 25,
  justifyContent: "center",
  alignItems: "center",
}

const BUTTON_TEXT: TextStyle = {
  fontSize: 25,
  color: palette.white,
  textAlign: "center",
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export const CircularProgressBarScreen = observer(function CircularProgressBarScreen() {
  const navigation = useNavigation()

  const progress = useSharedValue(0)

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`
  })

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }))

  const onPress = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 })
  }, [])

  return (
    <Screen style={ROOT} preset="scroll" unsafe>
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="Reanimated - Circular Progress Bar"
        titleStyle={{ color: palette.black }}
        style={HEADER_ABSOLUTE}
      />
      <ReText text={progressText} style={TEXT} />
      <Svg style={CIRCLE}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={"round"}
        />
      </Svg>
      <TouchableOpacity style={BUTTON} onPress={onPress}>
        <Text style={BUTTON_TEXT} text="RUN" />
      </TouchableOpacity>
    </Screen>
  )
})
