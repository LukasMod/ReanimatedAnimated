import React from "react"
import { View } from "react-native"
import { Text } from "../../../../components"

const CONTAINER = {
  backgroundColor: "#4b458c",
  flex: 1,
}

function BubbleTabDocuments() {
  return (
    <View style={CONTAINER}>
      <Text>Documents</Text>
    </View>
  )
}

export default BubbleTabDocuments
