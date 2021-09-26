import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { Header } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"
import { useSharedValue } from "react-native-reanimated"
import Backdrop from "./Backdrop"
import { Tabbar } from "./Tabbar"

// https://www.youtube.com/watch?v=B52na2LxQu4&list=PLkOyNuxGl9jxB_ARphTDoOWf5AE1J-x1r&index=4

const ROOT: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
  paddingTop: 32,
  alignItems: "center",
  backgroundColor: "#F5F7FE",
}

const HEADER_STYLE: ViewStyle = {
  position: "absolute",
  width: "100%",
  top: 20,
  height: 70,
  elevation: 2,
  zIndex: 2,
}

export const ReflectlyTabbarScreen = observer(function ReflectlyTabbarScreen() {
  const navigation = useNavigation()

  const open = useSharedValue(0)

  return (
    <View style={ROOT}>
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="Reanimated Reflectly Tabbar"
        titleStyle={{ color: palette.black }}
        style={HEADER_STYLE}
      />
      <View style={CONTAINER}>
        <Backdrop open={open} />
        <Tabbar open={open} />
      </View>
    </View>
  )
})
