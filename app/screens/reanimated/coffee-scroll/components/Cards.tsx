/* eslint-disable max-len */
import React from "react"
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native"

const { width } = Dimensions.get("window")
export const cards = [
  {
    picture: require("../assets/cards/a.jpg"),
    caption: "We’ve got an exciting announcement coming November 23rd...",
  },
  {
    picture: require("../assets/cards/b.jpg"),
    caption:
      "Let's look out for one another and keep each other safe. Remember, please wear a mask to pick up your order. If you'd like to learn more about our safety procedures check out our Community Updates page",
  },
  {
    picture: require("../assets/cards/c.jpg"),
    caption: "We’ve got an exciting announcement coming November 23rd...",
  },
  {
    picture: require("../assets/cards/d.jpg"),
    caption:
      "Your mission, should you accept, is to snag yourself a bottle of this tasty cold brew to enjoy at home. Don't forget to add a 32oz bottle of Mission Cold Brew to your next order.",
  },
]

const IMAGE: ImageStyle = {
  ...StyleSheet.absoluteFillObject,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  height: undefined,
  width: undefined,
}
const CONTAINER: ViewStyle = {
  height: width,
  marginHorizontal: 32,
  marginTop: 16,
}
const CAPTION: ViewStyle = {
  backgroundColor: "white",
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
  marginBottom: 16,
  marginHorizontal: 24,
  padding: 24,
}

const TEXT: TextStyle = {
  color: "#432406",
  fontSize: 16,
  textAlign: "center",
}

interface CardProps {
  picture: ReturnType<typeof require>
  caption: string
}

const Card = ({ picture, caption }: CardProps) => {
  return (
    <>
      <View style={CONTAINER}>
        <Image source={picture} style={IMAGE} />
      </View>
      <View style={CAPTION}>
        <Text style={TEXT}>{caption}</Text>
      </View>
    </>
  )
}

const Cards = () => {
  return (
    <View>
      {cards.map(({ picture, caption }, index) => (
        <Card key={index} picture={picture} caption={caption} />
      ))}
    </View>
  )
}

export default Cards
