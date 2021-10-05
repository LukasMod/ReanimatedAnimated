import React, { useCallback, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions, TextStyle, TouchableOpacity, View } from "react-native"
import { Header, Screen, Text } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import Animated, { useSharedValue, withTiming, runOnJS } from "react-native-reanimated"
import { palette } from "../../../theme/palette"
import { CircularProgressBarGradient } from "./circular-progress-bar-gradient"

/**
 * Based in part on:
 * https://www.youtube.com/watch?v=9n2mQJ7TO6Y
 * https://www.youtube.com/watch?v=t0FD4x0tX4E&t=120s
 **/

const { width } = Dimensions.get("window")

const ROOT: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const HEADER_ABSOLUTE: ViewStyle = {
  position: "absolute",
  width: "100%",
  top: 20,
  height: 70,
  elevation: 2,
  zIndex: 2,
}

const BUTTON_WRAPPER: ViewStyle = {
  position: "absolute",
  bottom: 80,
  justifyContent: "center",
  alignItems: "center",
}
const BUTTON: ViewStyle = {
  backgroundColor: "#335BFF",
  width: width * 0.7,
  height: 35,
  borderRadius: 25,
  justifyContent: "center",
  alignItems: "center",
  marginVertical: 10,
}

const BUTTON_TEXT: TextStyle = {
  fontSize: 20,
  color: "white",
  textAlign: "center",
}

export const CircularProgressBarGradientScreen = observer(
  function CircularProgressBarGradientScreen() {
    const navigation = useNavigation()

    const [value, setValue] = useState(0)
    const [blocked, setBlocked] = useState(false)

    const BACKGROUND_STROKE_COLOR = "#303858"
    const COLORS = ["#335BFF", "#33FCFF", "#5BFF33", "#FF3333", "#FFFF33"]

    const adjustSampling = 50

    return (
      <Screen style={ROOT} preset="scroll" unsafe>
        <Header
          onLeftPress={() => navigation.goBack()}
          leftIcon={"back"}
          headerText="Circular Progress Bar with Gradient"
          titleStyle={{ color: palette.black }}
          style={HEADER_ABSOLUTE}
        />
        <CircularProgressBarGradient
          strokeWidthInner={16}
          strokeWidthOuter={26}
          size={250}
          backgroundStrokeColor={BACKGROUND_STROKE_COLOR}
          colors={COLORS}
          newValue={value}
          adjustSampling={adjustSampling}
          setBlocked={setBlocked}
        />
        <View style={BUTTON_WRAPPER}>
          <TouchableOpacity style={BUTTON} onPress={() => setValue(value + 1)} disabled={blocked}>
            <Text style={BUTTON_TEXT} text="ADD 1 LEVEL" />
          </TouchableOpacity>
          <TouchableOpacity style={BUTTON} onPress={() => setValue(value + 0.3)} disabled={blocked}>
            <Text style={BUTTON_TEXT} text="ADD 0.3 LEVEL" />
          </TouchableOpacity>
        </View>
      </Screen>
    )
  },
)
