import React from "react"
import { View, ViewStyle } from "react-native"
import { WebView } from "react-native-webview"

import { MARGIN, SIZE } from "./Config"

const CONTAINER: ViewStyle = {
  width: SIZE,
  height: SIZE,
}
const WEBVIEW: ViewStyle = {
  flex: 1,
  margin: MARGIN * 2,
  borderRadius: MARGIN,
}

interface TileProps {
  id: string
  uri: string
  onLongPress: () => void
}

const Tile = ({ uri }: TileProps) => {
  return (
    <View style={CONTAINER} pointerEvents="none">
      <WebView source={{ uri }} style={WEBVIEW} />
    </View>
  )
}

export default Tile
