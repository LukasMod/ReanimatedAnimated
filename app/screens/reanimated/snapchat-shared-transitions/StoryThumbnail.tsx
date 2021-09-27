import React, { useState } from "react"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { SharedElement } from "react-navigation-shared-element"
import { View, Image, StyleSheet, Dimensions, Pressable, ViewStyle, ImageStyle } from "react-native"

import { Story } from "./Model"

const margin = 16
const borderRadius = 5
const width = Dimensions.get("window").width / 2 - margin * 2

const CONTAINER: ViewStyle = {
  borderRadius,
  height: width * 1.77,
  marginTop: 16,
  width,
}
const IMAGE: ImageStyle = {
  ...StyleSheet.absoluteFillObject,
  borderRadius,
  height: undefined,
  resizeMode: "cover",
  width: undefined,
}
const FULL: ViewStyle = {
  flex: 1,
}

interface StoryThumbnailProps {
  story: Story
}

const StoryThumbnail = ({ story }: StoryThumbnailProps) => {
  const navigation = useNavigation()
  const [opacity, setOpacity] = useState(1)

  const OPACITY = {
    opacity,
  }

  useFocusEffect(() => {
    if (navigation.isFocused()) {
      setOpacity(1)
    }
  })

  return (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      onPress={() => {
        navigation.navigate("Story", { story })
        setOpacity(0)
      }}
    >
      <View style={[CONTAINER, OPACITY]}>
        <SharedElement id={story.id} style={FULL}>
          <Image source={story.source} style={IMAGE} />
        </SharedElement>
      </View>
    </Pressable>
  )
}

export default StoryThumbnail
