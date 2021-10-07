import React from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  Dimensions,
  TextStyle,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native"
import { Header, Screen } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"
import { useSharedValue } from "react-native-reanimated"
import SearchBar from "./SearchBar"
import Overlay from "./Overlay"
import NavBar from "./NavBar"
import MapView from "react-native-maps"
import MapList from "./map-list"

const { width, height } = Dimensions.get("window")

const ROOT: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const CONTAINER: ViewStyle = {
  flex: 1,
}

const TEXT: TextStyle = {
  fontSize: 80,
  color: "rgba(256,256,256,0.7)",
}

const HEADER_ABSOLUTE: ViewStyle = {
  position: "absolute",
  width: "100%",
  top: 20,
  height: 70,
  elevation: 2,
  zIndex: 2,
}

const DATA = [
  { id: "id-1", title: "Maison Paul Bocuse", backgroundColor: "grey" },
  { id: "id-2", title: "Carcassonne", backgroundColor: "red" },
  { id: "id-3", title: "Toulouse", backgroundColor: "blue" },
  { id: "id-4", title: "Montpellier", backgroundColor: "grey" },
  { id: "id-5", title: "Heathrow", backgroundColor: "red" },
  { id: "id-6", title: "Cardiff", backgroundColor: "blue" },
  { id: "id-7", title: "Monmouth", backgroundColor: "grey" },
  { id: "id-8", title: "Westport", backgroundColor: "red" },
]

export const MapItemsScreen = observer(function MapItemsScreen() {
  const navigation = useNavigation()

  const y = useSharedValue(0)

  return (
    <Screen style={ROOT} preset="fixed" unsafe>
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="Reanimated - Map Items"
        titleStyle={{ color: palette.black }}
        style={HEADER_ABSOLUTE}
      />
      <View style={CONTAINER}>
        {Platform.OS === "ios" ? (
          <MapView
            initialRegion={{
              latitude: 35.679453,
              longitude: 139.6887197,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0922,
            }}
            style={{ width, height }}
          />
        ) : (
          <View style={{ width, height, backgroundColor: "pink" }} />
        )}
        <Overlay panY={y} />
        <MapList data={DATA} panY={y} />
        <SafeAreaView style={StyleSheet.absoluteFill} pointerEvents="none">
          <View style={CONTAINER}>
            <SearchBar panY={y} />
            <NavBar panY={y} />
          </View>
        </SafeAreaView>
      </View>
    </Screen>
  )
})
