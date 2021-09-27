/* eslint-disable react-native/no-color-literals */
import React from "react"
import { View, Text, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: "#E8E6E8",
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
  },
  root: {
    padding: 4,
  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
    borderBottomWidth: 3,
    borderColor: "#E8E6E8",
    borderRadius: 8,
    top: 4,
  },
  text: {
    fontSize: 19,
  },
})

export interface WordProps {
  id: number
  word: string
}

const Word = ({ word }: WordProps) => (
  <View style={styles.root}>
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>{word}</Text>
      </View>
      <View style={styles.shadow} />
    </View>
  </View>
)

export default Word
