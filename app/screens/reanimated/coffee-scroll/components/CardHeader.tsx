import React from "react"
import { Text, TextStyle, View, ViewStyle } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faArchway } from "@fortawesome/free-solid-svg-icons"

const CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  marginBottom: 16,
  padding: 16,
}
const ACTION: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "flex-end",
  alignSelf: "center",
}

const FULL: ViewStyle = {
  flex: 1,
}

const TITLE: TextStyle = {
  alignSelf: "center",
}

const CardHeader = () => {
  return (
    <View style={CONTAINER}>
      <View style={FULL} />
      <Text style={TITLE}>RECOMMEND</Text>
      <View style={ACTION}>
        <FontAwesomeIcon icon={faArchway} size={16} />
      </View>
    </View>
  )
}

export default CardHeader
