import * as React from "react"
import { TextStyle, View, ViewStyle, StyleSheet, ImageStyle, Image, Dimensions } from "react-native"
import { observer } from "mobx-react-lite"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated"
import { ProfileModel } from "./db"
import { Text } from "../../../components"

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

export const α = Math.PI / 12
export const OUT_OF_SCREEN = Math.sin(α) * SCREEN_HEIGHT + Math.cos(α) * SCREEN_WIDTH

const CONTAINER: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: "white",
}
const IMAGE: ImageStyle = {
  ...StyleSheet.absoluteFillObject,
  width: null,
  height: null,
  borderRadius: 8,
}

const OVERLAY: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
  padding: 16,
}
const HEADER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}
const FOOTER: ViewStyle = {
  flexDirection: "row",
}
const NAME: TextStyle = {
  color: "white",
  fontSize: 32,
}
const LIKE: ViewStyle = {
  borderColor: "#6ee3b4",
  borderRadius: 5,
  borderWidth: 4,
  padding: 8,
}
const LIKE_LABEL: TextStyle = {
  color: "#6ee3b4",
  fontSize: 32,
  fontWeight: "bold",
}

const NOPE: ViewStyle = {
  borderColor: "#ec5288",
  borderRadius: 5,
  borderWidth: 4,
  padding: 8,
}
const NOPE_LABEL: TextStyle = {
  color: "#ec5288",
  fontSize: 32,
  fontWeight: "bold",
}

export interface ProfileProps {
  profile: ProfileModel
  onTop: boolean
  translateX: Animated.SharedValue<number>
  translateY: Animated.SharedValue<number>
  scale: Animated.SharedValue<number>
  index: number
}

export const Profile = observer(function Profile(props: ProfileProps) {
  const { profile, translateX, translateY, onTop, scale, index } = props

  const x = useDerivedValue(() => (onTop ? translateX.value : 0))

  const R_CONTAINER = useAnimatedStyle(() => {
    const rotateDeg = interpolate(
      x.value,
      [-SCREEN_WIDTH / 2, SCREEN_WIDTH / 2],
      [-α, α],
      Extrapolate.CLAMP,
    )
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotateDeg}` },
        { scale: scale.value },
      ],
    }
  })

  const R_LIKE = useAnimatedStyle(() => {
    const opacity = interpolate(x.value, [0, SCREEN_WIDTH / 4], [0, 1], Extrapolate.CLAMP)
    return {
      opacity,
    }
  })

  const R_NOPE = useAnimatedStyle(() => {
    const opacity = interpolate(x.value, [-SCREEN_WIDTH / 4, 0], [1, 0], Extrapolate.CLAMP)
    return {
      opacity,
    }
  })

  return (
    <Animated.View style={[CONTAINER, R_CONTAINER]}>
      <Image style={IMAGE} source={profile.profile} />
      <View style={OVERLAY}>
        <View style={HEADER}>
          <Animated.View style={[LIKE, R_LIKE]}>
            <Text style={LIKE_LABEL}>LIKE</Text>
          </Animated.View>
          <Animated.View style={[NOPE, R_NOPE]}>
            <Text style={NOPE_LABEL}>NOPE</Text>
          </Animated.View>
        </View>
        <View style={FOOTER}>
          <Text style={NAME}>
            {profile.name}
            index: {index}
          </Text>
        </View>
      </View>
    </Animated.View>
  )
})
