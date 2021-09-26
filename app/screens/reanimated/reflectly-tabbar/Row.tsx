import React from "react"
import { Text, View, Alert, TextStyle, ViewStyle, ImageStyle } from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"

interface RowProps {
  label: string
  // icon: ComponentProps<typeof Icon>["icon"]
  icon: IconProp
}

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
}

const LABEL: TextStyle = {
  color: "white",
  textAlign: "center",
  fontSize: 18,
  marginRight: 8,
}

const ICON_HEIGHT_SMALL = 24

const ICON: ImageStyle = {
  width: ICON_HEIGHT_SMALL,
  height: ICON_HEIGHT_SMALL,
  justifyContent: "center",
  alignItems: "center",
}

const Row = ({ label, icon }: RowProps) => {
  return (
    <TouchableWithoutFeedback onPress={() => Alert.alert(label)}>
      <View style={CONTAINER}>
        <Text style={LABEL}>{label}</Text>
        <FontAwesomeIcon icon={icon} size={ICON_HEIGHT_SMALL} color={"white"} />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Row
