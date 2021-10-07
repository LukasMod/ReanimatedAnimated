import React, { useCallback } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions, TextStyle, View, StyleSheet, SafeAreaView } from "react-native"
import { Header, Screen, Text } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"
import Animated, {
  useDerivedValue,
  useSharedValue,
  withTiming,
  useAnimatedProps,
} from "react-native-reanimated"
import SearchBar from "./SearchBar"
import Overlay from "./Overlay"
import NavBar from "./NavBar"
import GeoBar from "./GeoBar"
import BottomSheet from "./BottomSheet"
import PicturesCarousel from "./PicturesCarousel"
import MapView from "react-native-maps"

// https://www.youtube.com/watch?v=Z_dC5Mv99bI

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

export const GoogleMapsScreen = observer(function GoogleMapsScreen() {
  const navigation = useNavigation()

  const y = useSharedValue(0)

  return (
    <Screen style={ROOT} preset="scroll" unsafe>
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="Reanimated - Google Maps"
        titleStyle={{ color: palette.black }}
        style={HEADER_ABSOLUTE}
      />
      <View style={CONTAINER}>
        <MapView
          initialRegion={{
            latitude: 35.679453,
            longitude: 139.6887197,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0922,
          }}
          style={{ width, height }}
        />

        <GeoBar panY={y} />

        <Overlay panY={y} />

        <PicturesCarousel panY={y} />

        <BottomSheet panY={y} />

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
