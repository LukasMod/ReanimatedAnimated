import React, { useEffect } from "react"
import Animated, {
  interpolate,
  interpolateColor,
  runOnUI,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

import { Image, TouchableWithoutFeedback, TextStyle, ViewStyle } from "react-native"
import { Text } from "../../../../components"

import Images from "../images"
import { LinearGradient } from "expo-linear-gradient"

// idea based on https://www.youtube.com/watch?v=wfRXlEdmEwg

/** 2 options available
 *
 *  1 - simple interpolateColor from BACKGROUND_COLOR to END_COLOR with useAnimatedStyle
 *  2 - show linearGradient as a background after press, default gradient is [BACKGROUND_COLOR,BACKGROUND_COLOR]
 *
 *  option 1 already commented
 */

const bgColors = {
  home: "#ffe1c5",
  logger: "#e5c1e5",
  documents: "#d7d8f8",
  menu: "#bce3fa",
}

const textColors = {
  home: "#c56b14",
  logger: "#f37ff3",
  documents: "#4b458c",
  menu: "#2d9cdb",
}

const BACKGROUND_COLOR = "white"

function Tab({ label, accessibilityState, onPress }) {
  const focused = accessibilityState.selected
  const icon = !focused ? Images.icons[label] : Images.icons[`${label}Focused`]

  const progress = useDerivedValue(() => {
    return focused === false ? withTiming(0) : withTiming(1)
  }, [focused])

  const START_COLOR = focused ? "#ffeaa7" : BACKGROUND_COLOR
  const END_COLOR = focused ? bgColors[label] : BACKGROUND_COLOR

  const R_BACKGROUND = useAnimatedStyle(() => {
    // option 1
    const backgroundColor = interpolateColor(progress.value, [0, 1], [BACKGROUND_COLOR, END_COLOR])
    const width = interpolate(progress.value, [0, 1], [5, 25])
    return {
      // option 1
      backgroundColor,

      width: `${width}%`,
    }
  })
  const R_LABEL = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 1], [0.5, 1])
    return {
      opacity,
    }
  })

  const ICON = {
    height: 24,
    width: 24,
  }
  const LABEL: TextStyle = {
    color: `${textColors[label]}`,
    marginLeft: 8,
    textTransform: "capitalize",
    fontWeight: "600",
  }

  const FULL: ViewStyle = {
    flex: 1,
  }
  const BACKGROUND: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    marginVertical: 6,
    flexGrow: 1,
  }

  // option 2
  const GRADIENT_WRAPPER: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    width: "100%",
    height: "100%",
  }

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          onPress()
        }}
        style={FULL}
      >
        <Animated.View style={[BACKGROUND, R_BACKGROUND]}>
          {/* option 1 */}
          <Image source={icon} style={ICON} />
          <Animated.View style={R_LABEL}>
            {focused && <Text style={LABEL} text={label} numberOfLines={1} />}
          </Animated.View>

          {/* option 2 */}
          {/* <LinearGradient
            colors={[START_COLOR, END_COLOR]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1.2, y: 0 }}
            style={GRADIENT_WRAPPER}
          >
            <Image source={icon} style={ICON} />
            <Animated.View style={R_LABEL}>
              {focused && <Text style={LABEL} text={label} numberOfLines={1} />}
            </Animated.View>
          </LinearGradient> */}
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  )
}

export default Tab
