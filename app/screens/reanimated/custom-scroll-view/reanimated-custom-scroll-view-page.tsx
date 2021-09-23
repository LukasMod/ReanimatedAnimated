import * as React from "react"
import { StyleProp, TextStyle, ViewStyle, StyleSheet, Dimensions } from "react-native"
import { observer } from "mobx-react-lite"
import { flatten } from "ramda"
import { palette } from "../../../theme/palette"
import Animated, { useAnimatedStyle } from "react-native-reanimated"
import { typography } from "../../../theme"
import { Text } from "../../../components"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  flex: 1,
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 60,
  color: palette.white,
  textTransform: "uppercase",
}

const { width: PAGE_WIDTH } = Dimensions.get("window")

export interface ReanimatedCustomScrollViewPageProps {
  style?: StyleProp<ViewStyle>
  title: string
  index: number
  translateX: Animated.SharedValue<number>
}

export const ReanimatedCustomScrollViewPage = observer(function ReanimatedCustomScrollViewPage(
  props: ReanimatedCustomScrollViewPageProps,
) {
  const { style, title, index, translateX } = props
  const styles = flatten([CONTAINER, style])

  const pageOffset = PAGE_WIDTH * index

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value + pageOffset }],
    }
  })

  return (
    <Animated.View
      style={[
        styles,
        { backgroundColor: `rgba(0,0,256, 0.${index + 2})` },
        { ...StyleSheet.absoluteFillObject },
        rStyle,
      ]}
    >
      <Text text={title} style={TEXT} />
    </Animated.View>
  )
})
