import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions, Image, ImageStyle, StyleSheet, View } from "react-native"
import { Header, Screen } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { PinchGestureHandler, PinchGestureHandlerGestureEvent } from "react-native-gesture-handler"

// https://www.youtube.com/watch?v=-39OEXk_mWc&list=PLkOyNuxGl9jxB_ARphTDoOWf5AE1J-x1r&index=10
import { MARGIN, SIZE } from "./Config"
import Tile from "./Tile"
import SortableList from "./SortableList"
import { SafeAreaView } from "react-native-safe-area-context"

const tiles = [
  {
    id: "google",
    uri: "https://google.com",
  },

  {
    id: "expo",
    uri: "https://expo.io",
  },
  {
    id: "facebook",
    uri: "https://facebook.com",
  },
  {
    id: "reanimated",
    uri: "https://docs.swmansion.com/react-native-reanimated/",
  },
  {
    id: "github",
    uri: "https://github.com",
  },
  {
    id: "rnnavigation",
    uri: "https://reactnavigation.org/",
  },
  {
    id: "youtube",
    uri: "https://youtube.com",
  },
  {
    id: "twitter",
    uri: "https://twitter.com",
  },
]

const ROOT: ViewStyle = {
  flex: 1,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: "black",
  paddingHorizontal: MARGIN,
}

const HEADER_ABSOLUTE: ViewStyle = {
  position: "absolute",
  width: "100%",
  top: 20,
  height: 70,
  elevation: 2,
  zIndex: 2,
}

export const ChromeDragScreen = observer(function ChromeDragScreen() {
  const navigation = useNavigation()

  return (
    <View style={ROOT}>
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="Reanimated Chrome Drag To Sort"
        titleStyle={{ color: palette.black }}
        style={HEADER_ABSOLUTE}
      />
      <SafeAreaView style={CONTAINER}>
        <SortableList>
          {[...tiles, ...tiles].map((tile, index) => (
            <Tile
              onLongPress={() => true}
              key={tile.id + "-" + index}
              id={tile.id + "-" + index}
              uri={tile.uri}
            />
          ))}
        </SortableList>
      </SafeAreaView>
    </View>
  )
})
