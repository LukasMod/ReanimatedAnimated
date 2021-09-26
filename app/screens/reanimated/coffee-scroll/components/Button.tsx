import React from "react"
import { View, TouchableWithoutFeedback, Text, Dimensions, ViewStyle, TextStyle } from "react-native"

interface ButtonProps {
  label: string
}

const width = (Dimensions.get("window").width - 64) / 2

const CONTAINER: ViewStyle = {
  backgroundColor: "#432406",
  padding: 16,
  flexDirection: "row",
  justifyContent: "center",
  alignSelf: "center",
  borderRadius: 27,
  height: 54,
  width: width,
}

const LABEL: TextStyle = {
  color: "white",
  fontSize: 16,
  alignSelf: "center",
}

const Button = ({ label }: ButtonProps) => {
  return (
    <TouchableWithoutFeedback>
      <View style={CONTAINER}>
        <Text style={LABEL}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Button
