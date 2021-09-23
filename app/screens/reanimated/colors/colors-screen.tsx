/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions, TextStyle } from "react-native"
import { Header, Screen, Switch } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

// https://www.youtube.com/watch?v=U_V9pHnTXjA&t=3s

const colorLightMode = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  background: palette.lighterGrey,
  primary: palette.orange,
  primaryDarker: palette.orangeDarker,
  line: palette.offWhite,
  text: palette.black,
  dim: palette.lightGrey,
  error: palette.angry,
  storybookDarkBg: palette.black,
  storybookTextColor: palette.black,
  circle: palette.white,
}

const colorDarkMode = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  background: palette.black,
  primary: palette.orange,
  primaryDarker: palette.orangeDarker,
  line: palette.offWhite,
  text: palette.white,
  dim: palette.lightGrey,
  error: palette.angry,
  storybookDarkBg: palette.black,
  storybookTextColor: palette.black,
  circle: palette.lightGrey,
}

const SIZE = Dimensions.get("window").width * 0.7

const ROOT: ViewStyle = {
  flex: 1,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const HEADER_ABSOLUTE: ViewStyle = {
  position: "absolute",
  width: "100%",
  top: 20,
  height: 70,
  elevation: 2,
  zIndex: 2,
}

const SWITCH_TRACK_COLOR = {
  true: { backgroundColor: "rgba(256, 0 ,256, 0.2)", borderColor: "none" },
  false: { backgroundColor: "rgba(0,0,0,0.1)" },
}

const CIRCLE: ViewStyle = {
  width: SIZE,
  height: SIZE,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: SIZE / 2,
  shadowOffset: {
    width: 0,
    height: 20,
  },
  shadowRadius: 10,
  shadowOpacity: 0.2,
  elevation: 8,
}

const TEXT: TextStyle = {
  fontSize: 70,
  textTransform: "uppercase",
  letterSpacing: 14,
  marginBottom: 30,
}

type ThemeType = "light" | "dark"

export const ColorsScreen = observer(function ColorsScreen() {
  const [theme, setTheme] = useState<ThemeType>("light")

  const navigation = useNavigation()

  // const progress = useSharedValue(0)

  const progress = useDerivedValue(() => {
    return theme === "dark" ? withTiming(1) : withTiming(0)
  }, [theme])

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colorLightMode.background, colorDarkMode.background],
    )

    return {
      backgroundColor,
    }
  })

  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colorLightMode.circle, colorDarkMode.circle],
    )

    return {
      backgroundColor,
    }
  })

  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [colorDarkMode.text, colorLightMode.background],
    )

    return {
      color,
    }
  })

  return (
    <Screen style={ROOT} preset="scroll" unsafe>
      <Animated.View style={[CONTAINER, rStyle]}>
        <Header
          onLeftPress={() => navigation.goBack()}
          leftIcon={"back"}
          headerText="Reanimated - Colors"
          style={HEADER_ABSOLUTE}
        />
        <Animated.Text style={[TEXT, rTextStyle]}>{theme}</Animated.Text>
        <Animated.View style={[CIRCLE, rCircleStyle]}>
          <Switch
            value={theme === "dark"}
            onToggle={(toggled) => {
              setTheme(toggled ? "dark" : "light")
            }}
            trackOnStyle={SWITCH_TRACK_COLOR.true}
            trackOffStyle={SWITCH_TRACK_COLOR.false}
            style={{ borderColor: palette.black }}
            thumbOnStyle={{ backgroundColor: "violet" }}
            thumbOffStyle={{ backgroundColor: "violet" }}
          />
        </Animated.View>
      </Animated.View>
    </Screen>
  )
})
