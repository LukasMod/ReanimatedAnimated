import React from "react"
import { View, ViewStyle } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

import { Story } from "./Model"
import StoryThumbnail from "./StoryThumbnail"
import { Header } from "../../../components"
import { palette } from "../../../theme/palette"

// https://www.youtube.com/watch?v=NJZfRXs7nZs&list=PLkOyNuxGl9jxB_ARphTDoOWf5AE1J-x1r&index=8

export const stories: Story[] = [
  {
    id: "2",
    source: require("./assets/stories/2.jpg"),
    user: "derek.russel",
    avatar: require("./assets/avatars/derek.russel.png"),
  },
  {
    id: "4",
    source: require("./assets/stories/4.jpg"),
    user: "jmitch",
    avatar: require("./assets/avatars/jmitch.png"),
  },
  {
    id: "7",
    source: require("./assets/stories/7.jpg"),
    user: "andrea.schmidt",
    avatar: require("./assets/avatars/andrea.schmidt.png"),
    video: require("./assets/stories/7.mp4"),
  },
  {
    id: "5",
    source: require("./assets/stories/5.jpg"),
    user: "monicaa",
    avatar: require("./assets/avatars/monicaa.png"),
  },
  {
    id: "3",
    source: require("./assets/stories/3.jpg"),
    user: "alexandergarcia",
    avatar: require("./assets/avatars/alexandergarcia.png"),
  },
  {
    id: "1",
    source: require("./assets/stories/1.jpg"),
    user: "andrea.schmidt",
    avatar: require("./assets/avatars/andrea.schmidt.png"),
  },
  {
    id: "6",
    source: require("./assets/stories/6.jpg"),
    user: "andrea.schmidt",
    avatar: require("./assets/avatars/andrea.schmidt.png"),
  },
]

const HEADER_ABSOLUTE: ViewStyle = {
  // position: "absolute",
  width: "100%",
  marginTop: 20,
  height: 70,
  elevation: 2,
  zIndex: 2,
  // backgroundColor: "rgba(255, 255, 255, 0.8)",
}
const CONTAINER: ViewStyle = {
  backgroundColor: "rgb(255, 255, 255)",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
}

const Snapchat = ({ navigation }) => {
  return (
    <>
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="Snapchat Shared Transitions"
        titleStyle={{ color: palette.black }}
        style={HEADER_ABSOLUTE}
      />
      <ScrollView>
        <View style={CONTAINER}>
          {stories.map((story) => (
            <StoryThumbnail key={story.id} story={story} />
          ))}
        </View>
      </ScrollView>
    </>
  )
}

export default Snapchat
