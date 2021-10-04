/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback, useRef, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, SafeAreaView, View } from "react-native"
import { faHeart, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon as Icon } from "@fortawesome/react-native-fontawesome"
import { ProfileModel, profilesData } from "./db"
import { Button, Header, Text } from "../../../components"
import { useSharedValue, withTiming } from "react-native-reanimated"
import { RectButton } from "react-native-gesture-handler"
import { SwipeableInfinite, SwipeInfiniteHandler } from "./swipeable-infinite"
import { useNavigation } from "@react-navigation/core"

/*
 * based on https://www.youtube.com/watch?v=vAtf1fENGDA&t=656s  (but for reanimated ver 2)
 * with changes to implement infinite logic and stack view
 */

const CARDS: ViewStyle = {
  flex: 1,
  margin: 8,
  zIndex: 100,
  justifyContent: "center",
  alignItems: "center",
}

const CIRCLE: ViewStyle = {
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: 32,
  height: 64,
  justifyContent: "center",
  padding: 12,
  shadowColor: "gray",
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity: 0.18,
  shadowRadius: 2,
  width: 64,
}

const CONTAINER: ViewStyle = {
  backgroundColor: "#fbfaff",
  flex: 1,
}

const FOOTER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-evenly",
  padding: 16,
}

export const InfiniteTinderScreen = observer(function InfiniteTinderScreen() {
  const navigation = useNavigation()

  const scale = useSharedValue(1)

  const extraProfile: ProfileModel = {
    id: "5",
    name: "Jacky",
    age: 22,
    profile: require("./profiles/5.jpg"),
  }

  const [profiles, setProfiles] = useState(profilesData)
  const topCard = useRef<SwipeInfiniteHandler>(null)

  const [swipedCardsArray, setSwipedCardsArray] = useState([])
  const [leftCardsArray, setLeftCardsArray] = useState(profiles)

  const extraRightOffset = useSharedValue(0)

  const onSwipe = useCallback(
    (index, id) => {
      setSwipedCardsArray([leftCardsArray[index], ...swipedCardsArray])
      setLeftCardsArray(leftCardsArray.slice(0, leftCardsArray.length - 1))
      extraRightOffset.value = withTiming(extraRightOffset.value + 8) // not perfect
      console.log("swipe")
    },
    [leftCardsArray, extraRightOffset],
  )

  useEffect(() => {
    if (leftCardsArray.length === 1) {
      setLeftCardsArray([...swipedCardsArray, ...leftCardsArray])
      setSwipedCardsArray([])
      extraRightOffset.value = withTiming(0)
    }
  }, [leftCardsArray])

  useEffect(() => {
    setSwipedCardsArray([])
    setLeftCardsArray(profiles)
  }, [profiles])

  return (
    <SafeAreaView style={CONTAINER}>
      <Header leftIcon="back" onLeftPress={() => navigation.goBack()} />
      <Button
        text="add profile"
        onPress={() => {
          setProfiles([extraProfile, ...profilesData])
        }}
      />

      <View style={CARDS}>
        {leftCardsArray.map((profile, index) => {
          const onTop = index === leftCardsArray.length - 1

          return (
            <SwipeableInfinite
              ref={topCard}
              key={profile.id}
              profile={profile}
              onSwipe={() => onSwipe(index, profile.id)}
              onTop={onTop}
              scale={scale}
              index={index}
              extraRightOffset={extraRightOffset}
            />
          )
        })}
      </View>
      <View style={FOOTER}>
        <RectButton
          style={CIRCLE}
          onPress={() => {
            topCard.current?.swipeLeft()
          }}
        >
          <Icon icon={faTimes} size={32} color="#ec5288" />
        </RectButton>
        <RectButton
          style={CIRCLE}
          onPress={() => {
            topCard.current?.swipeRight()
          }}
        >
          <Icon icon={faHeart} size={32} color="#6ee3b4" />
        </RectButton>
      </View>
    </SafeAreaView>
  )
})
