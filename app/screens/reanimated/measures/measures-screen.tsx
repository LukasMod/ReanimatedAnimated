import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle } from "react-native"
import { Header, Screen, Text } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"

// https://www.youtube.com/watch?v=dOSp-VckNJU

import List, { ListModel } from "./List"

const list: ListModel = {
  name: "Total Points",
  items: [
    { name: "Nathaniel Fitzgerald", points: "$3.45" },
    { name: "Lawrence Fullter Fitzgerald", points: "$3.45" },
    { name: "Jacob Mullins", points: "$3.45" },
    { name: "Jesus Lewis", points: "$3.45" },
    { name: "Johnny Marr", points: "$2.56" },
  ],
}

const list2: ListModel = {
  name: "Total Points",
  items: [
    { name: "Nathaniel Fitzgerald", points: "$3.45" },
    { name: "Lawrence Fullter Fitzgerald", points: "$3.45" },
    { name: "Jacob Mullins", points: "$3.45" },
  ],
}

const list3: ListModel = {
  name: "Total Points",
  items: [
    { name: "Nathaniel Fitzgerald", points: "$3.45" },
    { name: "Lawrence Fullter Fitzgerald", points: "$3.45" },
  ],
}

const ROOT: ViewStyle = {
  flex: 1,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: "#f4f4f6",
  padding: 16,
}
const TITLE: TextStyle = {
  fontSize: 32,
  fontWeight: "bold",
}

const HEADER_ABSOLUTE: ViewStyle = {
  elevation: 2,
  zIndex: 2,
}

export const MeasuresScreen = observer(function MeasuresScreen() {
  const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="Reanimated Stars"
        titleStyle={{ color: palette.black }}
        style={HEADER_ABSOLUTE}
      />
      <View style={CONTAINER}>
        <Text style={TITLE}>Markets</Text>
        <List {...{ list }} />
        <List list={list2} />
        <List list={list3} />
        <List {...{ list }} />
        <List {...{ list }} />
        <List {...{ list }} />
      </View>
    </Screen>
  )
})
