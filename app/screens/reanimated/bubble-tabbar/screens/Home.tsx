import React from "react"
import { View } from "react-native"
import { Text } from "../../../../components"

const CONTAINER = {
  backgroundColor: "#c56b14",
  flex: 1,
}

function BubbleTabHome() {
  return (
    <View style={CONTAINER}>
      <Text>Home</Text>
    </View>
  )
}

export default BubbleTabHome
