import React, { useState, useCallback, useRef } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle } from "react-native"
import { Header, Screen, Text } from "../../../components"
import { useNavigation } from "@react-navigation/native"

import { palette } from "../../../theme/palette"
import { ScrollView } from "react-native-gesture-handler"
import { ListItem } from "./list-item"

// https://www.youtube.com/watch?v=AVS_2nzt8Do&list=PLjHsmVtnAr9TWoMAh-3QMiP7bPUqPFuFZ&index=10

const TITLES = [
  "Record the dismissible tutorial 🎥",
  "Leave 👍🏼 to the video",
  "Check YouTube comments",
  "Subscribe to the channel 🚀",
  "Leave a ⭐️ on the GitHub Repo",
]

export interface TaskInterface {
  title: string
  index: number
}

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }))

const ROOT: ViewStyle = {
  flex: 1,
}

const CONTAINER: ViewStyle = {
  flex: 1,
}

const TEXT: TextStyle = {
  fontSize: 60,
  color: "black",
  marginVertical: 20,
  paddingLeft: "5%",
}

const HEADER_ABSOLUTE: ViewStyle = {
  elevation: 2,
  zIndex: 2,
}

const SCROLLVIEW: ViewStyle = {
  flex: 1,
}

export const SwipeToDeleteScreen = observer(function SwipeToDeleteScreen() {
  const navigation = useNavigation()
  const [tasks, setTasks] = useState(TASKS)

  const onDismiss = useCallback((task: TaskInterface) => {
    setTasks((tasks) => tasks.filter((item) => item.index !== task.index))
  }, [])

  const scrollRef = useRef(null)

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="Reanimated Swipe to Delete"
        titleStyle={{ color: palette.black }}
        style={HEADER_ABSOLUTE}
      />
      <View style={CONTAINER}>
        <Text text="TASKS" style={TEXT} />
        <ScrollView style={SCROLLVIEW} ref={scrollRef}>
          {tasks.map((task) => (
            <ListItem
              key={task.index}
              task={task}
              onDismiss={onDismiss}
              simultaneousHandlers={scrollRef}
            />
          ))}
        </ScrollView>
      </View>
    </Screen>
  )
})
