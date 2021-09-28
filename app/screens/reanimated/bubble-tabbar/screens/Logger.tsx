import React from "react"
import { View } from "react-native"
import { Text } from "../../../../components"

const CONTAINER = {
  backgroundColor: "#f37ff3",
  flex: 1,
}

function BubbleTabLogger() {
  return (
    <View style={CONTAINER}>
      <Text>Logger</Text>
    </View>
  )
}

export default BubbleTabLogger
