import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions, StyleSheet, View, ImageStyle } from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"

import Svg, { Defs, LinearGradient, Mask, Path, Rect, Stop } from "react-native-svg"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import StaticTabbar, { SIZE } from "./StaticTabbar"
import Row from "./Row"

import { faTrashAlt, faAllergies, faAmbulance, faArchway } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { mix } from "react-native-redash"

const R = SIZE / 4
const COLOR = "#02CBD6"
const END_COLOR = "#00B4D4"
const WIDTH = 3.14 * SIZE
const HEIGHT = 3.5 * SIZE

const OVERLAY: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  justifyContent: "flex-end",
  alignItems: "center",
}
const ICON: ImageStyle = {
  width: SIZE,
  height: SIZE,
  borderRadius: R,
  justifyContent: "center",
  alignItems: "center",
}
const CONTENT: ViewStyle = {
  position: "absolute",
  bottom: 0,
  left: (Dimensions.get("window").width - WIDTH) / 2,
  width: WIDTH,
  height: HEIGHT,
  alignItems: "center",
}
const ITEMS: ViewStyle = {
  height: HEIGHT - SIZE,
  justifyContent: "space-evenly",
}

const W_2 = (WIDTH - SIZE) / 2 - 2 * R
const S = SIZE - 2 * R
const arc = (x: number, y: number, reverse = false) =>
  `a ${R} ${R} 0 0 ${reverse ? 0 : 1} ${x} ${y}`

const d = [
  `M 0 ${R}`,
  arc(R, -R),
  `h ${WIDTH - 2 * R}`,
  arc(R, R),
  `v ${HEIGHT - SIZE - 2 * R}`,
  arc(-R, R),
  `h ${-W_2}`,
  arc(-R, R, true),
  `v ${S}`,
  arc(-R, R),
  `h ${-S}`,
  arc(-R, -R),
  `v ${-S}`,
  arc(-R, -R, true),
  `h ${-W_2}`,
  arc(-R, -R),
  `Z`,
].join(" ")

const AnimatedRect = Animated.createAnimatedComponent(Rect)

interface TabbarProps {
  open: Animated.SharedValue<number>
}

export const Tabbar = observer(function Tabbar({ open }: TabbarProps) {
  const insets = useSafeAreaInsets()

  const animatedProps = useAnimatedProps(() => {
    const height = mix(open.value, SIZE, HEIGHT + SIZE)
    const width = interpolate(height, [2 * SIZE, HEIGHT], [SIZE, WIDTH], Extrapolate.CLAMP)
    const x = interpolate(width, [SIZE, WIDTH], [(WIDTH - SIZE) / 2, 0])
    const y = interpolate(height, [SIZE, HEIGHT], [HEIGHT - SIZE, 0])

    return {
      x,
      y,
      width,
      height,
    }
  })

  const R_ICON = useAnimatedStyle(() => ({
    transform: [{ rotate: `${mix(open.value, Math.PI / 4, 0)}rad` }],
  }))
  const R_ITEMS = useAnimatedStyle(() => ({
    opacity: interpolate(open.value, [0.75, 1], [0, 1], Extrapolate.CLAMP),
    transform: [{ translateY: mix(open.value, HEIGHT + insets.bottom, 0) }],
  }))

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          open.value = withTiming(open.value === 1 ? 0 : 1)
        }}
      >
        <View>
          <StaticTabbar />
          <View style={[OVERLAY, { paddingBottom: insets.bottom }]} pointerEvents="none">
            <Svg width={WIDTH} height={HEIGHT}>
              <Defs>
                <LinearGradient
                  id="gradient"
                  x1={WIDTH / 2}
                  y1={0}
                  x2={WIDTH / 2}
                  y2={HEIGHT}
                  gradientUnits="userSpaceOnUse"
                >
                  <Stop offset={0} stopColor={END_COLOR} />
                  <Stop offset={1} stopColor={COLOR} />
                </LinearGradient>
                <Mask id="mask">
                  <AnimatedRect animatedProps={animatedProps} rx={R} ry={R} fill="white" />
                </Mask>
              </Defs>
              <Path d={d} fill="url(#gradient)" mask="url(#mask)" />
            </Svg>
          </View>
          <View style={[OVERLAY, { paddingBottom: insets.bottom }]}>
            <View style={ICON}>
              <Animated.View style={R_ICON}>
                <FontAwesomeIcon icon={faAllergies} size={32} color={"white"} />
              </Animated.View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View
        style={[
          CONTENT,
          {
            bottom: insets.bottom,
          },
        ]}
        pointerEvents="box-none"
      >
        <Animated.View style={[ITEMS, R_ITEMS]}>
          <Row label="Mood check-in" icon={faTrashAlt} />
          <Row label="Voice note" icon={faAmbulance} />
          <Row label="Add Photo" icon={faArchway} />
        </Animated.View>
      </View>
    </>
  )
})
