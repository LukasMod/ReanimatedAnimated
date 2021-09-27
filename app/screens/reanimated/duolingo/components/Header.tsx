import React from "react"
import { StyleSheet, Text, View } from "react-native"

import Cross from "./Cross"
import Heart from "./Heart"
import Progress from "./Progress"
import Character from "./Character"

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    paddingLeft: 16,
  },
})

const Header = () => {
  return (
    <View>
      <View style={styles.row}>
        <Cross />
        <Progress />
        <Heart />
      </View>
      <Text style={styles.title}>Translate this sentence</Text>
      <Character />
    </View>
  )
}

export default Header
