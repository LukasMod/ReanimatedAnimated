import Color from "color"
import React from "react"
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextStyle,
  ImageStyle,
  ViewStyle,
} from "react-native"
import Svg, { RadialGradient, Defs, Rect, Stop } from "react-native-svg"

const { width, height } = Dimensions.get("screen")
const SIZE = width - 75

const CONTAINER: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  padding: 75,
  paddingTop: 150,
  alignItems: "center",
}

const DESCRIPTION: TextStyle = {
  color: "white",
  fontSize: 18,
  textAlign: "center",
}

const IMAGE: ImageStyle = {
  height: SIZE,
  width: SIZE,
}

const TITLE: TextStyle = {
  color: "white",
  fontSize: 48,
  marginBottom: 16,
  textAlign: "center",
}

export interface SlideProps {
  slide: {
    color: string
    title: string
    description: string
    picture: ReturnType<typeof require>
  }
}

const Slide = ({ slide: { picture, color, title, description } }: SlideProps) => {
  const lighterColor = Color(color).lighten(0.8).toString()
  return (
    <>
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="gradient" cx="50%" cy="35%">
            <Stop offset="0%" stopColor={lighterColor} />
            <Stop offset="100%" stopColor={color} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill="url(#gradient)" />
      </Svg>
      <View style={CONTAINER}>
        <Image source={picture} style={IMAGE} />
        <View>
          <Text style={TITLE}>{title}</Text>
          <Text style={DESCRIPTION}>{description}</Text>
        </View>
      </View>
    </>
  )
}

export default Slide
