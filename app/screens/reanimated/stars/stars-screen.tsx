import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle } from "react-native"
import { Header, Screen, Text } from "../../../components"
import { useNavigation } from "@react-navigation/native"

import { palette } from "../../../theme/palette"
import { Star } from "./star"
import { Easing, useSharedValue, withRepeat, withTiming } from "react-native-reanimated"
import { stars } from "./starData"

// https://adapptor.com.au/blog/creating-a-star-field-with-reanimated-2

const ROOT: ViewStyle = {
  flex: 1,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: palette.black,
}

const HEADER_ABSOLUTE: ViewStyle = {
  elevation: 2,
  zIndex: 2,
}

export const StarsScreen = observer(function StarsScreen() {
  const navigation = useNavigation()
  const timeVal = useSharedValue(0)

  const duration = 2
  useEffect(() => {
    timeVal.value = 0
    timeVal.value = withRepeat(
      withTiming(
        duration,
        {
          duration: 2000 * duration,
          easing: Easing.linear,
        },
        () => console.log(timeVal.value),
      ),
      0,
      false,
    )
  }, [])

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="Reanimated Stars"
        titleStyle={{ color: palette.black }}
        style={HEADER_ABSOLUTE}
      />
      <View style={CONTAINER}>
        {stars.map((s) => (
          <Star key={s.id} time={timeVal} {...s} />
        ))}
      </View>
    </Screen>
  )
})
