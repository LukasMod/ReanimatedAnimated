import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Header, Screen } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"
import { TinderCard } from "./tinder-card"
import { TinderStack } from "./tinder-stack"

const tinderCards = [
  {
    id: "1",
    name: "Vadim Savin",
    image:
      "https://images.unsplash.com/photo-1568325541679-e17580ab3e4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
    bio: "I will be the semicolons to your code",
  },
  {
    id: "2",
    name: "Elon Musk",
    image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png",
    bio: "A dude with a rocket is looking for a gal with fuel",
  },
  {
    id: "3",
    name: "Zuck",
    image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg",
    bio: "No need to send me your nudes, I already saw them",
  },
  {
    id: "4",
    name: "Jeffrey Bezos",
    image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/jeff.jpeg",
    bio: "CEO, entrepreneur born in 1964, Jeffrey, Jeffrey Bezos",
  },
  {
    id: "5",
    name: "Jeffrey Bezos",
    image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/jeff.jpeg",
    bio: "CEO, entrepreneur born in 1964, Jeffrey, Jeffrey Bezos",
  },
]

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: palette.black,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: palette.black,
  justifyContent: "center",
  alignItems: "center",
}

export const TinderCloneScreen = observer(function TinderCloneScreen(props) {
  const navigation = useNavigation()

  const onSwipeLeft = (name: string) => {
    console.warn("swipe left", name)
  }

  const onSwipeRight = (name: string) => {
    console.warn("swipe right", name)
  }

  return (
    <Screen style={ROOT} preset="fixed">
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="Tinder Clone"
        titleStyle={{ color: palette.pinky }}
        style={{ backgroundColor: palette.black }}
      />
      <View style={CONTAINER}>
        <TinderStack
          data={tinderCards}
          renderItem={(card) => <TinderCard tinderCard={card} />}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
        />
      </View>
    </Screen>
  )
})
