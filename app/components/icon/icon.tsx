import * as React from "react"
import { View, ImageStyle } from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { AutoImage as Image } from "../auto-image/auto-image"
import { IconProps } from "./icon.props"
import { icons } from "./icons"

const ROOT: ImageStyle = {
  resizeMode: "contain",
}

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle, size, onPress } = props

  return (
    <TouchableWithoutFeedback style={containerStyle} onPress={onPress}>
      <Image
        style={[ROOT, styleOverride, size && { height: size, width: size }]}
        source={icons[icon]}
      />
    </TouchableWithoutFeedback>
  )
}
