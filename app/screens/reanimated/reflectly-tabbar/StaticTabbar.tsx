import React from "react"
import { Dimensions, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import {
  faTrashAlt,
  faAlignJustify,
  faAllergies,
  faAmbulance,
  faArchway,
} from "@fortawesome/free-solid-svg-icons"

const { width } = Dimensions.get("window")

const CONTAINER: ViewStyle = {
  width,
  backgroundColor: "white",
  flexDirection: "row",
  justifyContent: "space-evenly",
  borderTopRightRadius: 32,
  borderTopLeftRadius: 32,
  paddingTop: 32,
}

const ICON_COLOR = "#B9B9C7"

export const SIZE = width / 5

const ICON_HEIGHT_SMALL = 24


const StaticTabbar = () => {
  const insets = useSafeAreaInsets()
  return (
    <View style={[CONTAINER, { paddingBottom: 22 + insets.bottom }]}>
      <FontAwesomeIcon icon={faTrashAlt} size={ICON_HEIGHT_SMALL} color={ICON_COLOR} />
      <FontAwesomeIcon icon={faAlignJustify} size={ICON_HEIGHT_SMALL} color={ICON_COLOR} />
      <FontAwesomeIcon icon={faAllergies} size={ICON_HEIGHT_SMALL} color={ICON_COLOR} />
      <FontAwesomeIcon icon={faAmbulance} size={ICON_HEIGHT_SMALL} color={ICON_COLOR} />
      <FontAwesomeIcon icon={faArchway} size={ICON_HEIGHT_SMALL} color={ICON_COLOR} />
    </View>
  )
}

export default StaticTabbar
