import React from "react"
import { Dimensions, View, Text, ViewStyle, TextStyle } from "react-native"

import { Product } from "./Model"
import Button from "./components/Button"
import CardHeader from "./components/CardHeader"

const { width } = Dimensions.get("window")
export const CARD_HEIGHT = (width * 1564) / 974

const CONTAINER: ViewStyle = {
  width,
  height: CARD_HEIGHT,
}

const TITLE: TextStyle = {
  fontSize: 28,
  textAlign: "center",
  color: "#432406",
  marginBottom: 16,
}
const SUBTITLE: TextStyle = {
  fontSize: 16,
  textAlign: "center",
  color: "#432406",
}

interface CardProps {
  product: Product
}

const Card = ({ product: { color1, title, subtitle } }: CardProps) => {
  const CARD: ViewStyle = {
    borderRadius: 16,
    margin: 32,
    flex: 1,
    backgroundColor: color1,
    padding: 16,
    justifyContent: "space-between",
  }

  return (
    <View style={CONTAINER}>
      <View style={CARD}>
        <View>
          <CardHeader />
          <Text style={TITLE}>{title}</Text>
          <Text style={SUBTITLE}>{subtitle}</Text>
        </View>
        <Button label="I'll try it" />
      </View>
    </View>
  )
}

export default Card
