import React from "react"
import {
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  View,
  Text,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated"

const { width, height } = Dimensions.get("window")
export const MIN_HEIGHT = 128
export const MAX_HEIGHT = height / 2

const CONTAINER: ViewStyle = {
  width,
  height: MAX_HEIGHT,
  justifyContent: "flex-end",
}
const TITLE_CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  maxHeight: MAX_HEIGHT * 0.61,
}
const TITLE: TextStyle = {
  color: "white",
  fontSize: 32,
  fontWeight: "500",
  textAlign: "center",
}
const MAIN_TITLE: TextStyle = {
  ...StyleSheet.absoluteFillObject,
  justifyContent: "center",
  padding: 32,
  transform: [{ translateY: 64 }],
}
const SUBTITLE: TextStyle = {
  color: "white",
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "center",
}
const PICTURE: ImageStyle = {
  ...StyleSheet.absoluteFillObject,
  height: undefined,
  width: undefined,
}

export interface IItem {
  title: string
  subtitle: string
  picture: number
  top: number
}

interface ItemProps {
  index: number
  item: IItem
  y: Animated.SharedValue<number>
}

const Item = ({ item: { title, subtitle, picture }, index, y }: ItemProps) => {
  const inputRange = [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT]

  const R_CONTAINER = useAnimatedStyle(() => {
    return {
      height: interpolate(-y.value, inputRange, [MIN_HEIGHT, MAX_HEIGHT], Extrapolate.CLAMP),
      top: y.value,
    }
  })

  const R_TITLE = useAnimatedStyle(() => {
    return { opacity: interpolate(-y.value, inputRange, [0, 1]) }
  })

  return (
    <TouchableWithoutFeedback onPress={() => Alert.alert("Pressed!")}>
      <Animated.View style={[CONTAINER, R_CONTAINER]}>
        <Image source={picture} style={PICTURE} />
        <View style={TITLE_CONTAINER}>
          <Text style={SUBTITLE}>{subtitle.toUpperCase()}</Text>
          <View style={MAIN_TITLE}>
            <Animated.View style={R_TITLE}>
              <Text style={TITLE}>{title.toUpperCase()}</Text>
            </Animated.View>
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default Item
