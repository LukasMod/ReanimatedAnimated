import React, { useState, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Animated, Easing, TextStyle } from "react-native"
import {  Checkbox, Header, Icon, Text } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"
import Collapsible from "react-native-collapsible"

const TERM_1_SHORT = "TERM 1"
const TERM_1_LONG =
  "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
const TERM_2_SHORT = "TERM 2"
const TERM_2_LONG =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."

const ROOT: ViewStyle = {
  flex: 1,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  // justifyContent: "center",
  // alignItems: "center",
  padding: 20,
}

const HEADER_STYLE: ViewStyle = {
  marginTop: 20,
  height: 70,
  elevation: 2,
  zIndex: 2,
}

const ITEM: ViewStyle = {
  marginTop: 20,
}
const ITEM_HEADER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}
const REQUIRED_TEXT: TextStyle = {
  color: "red",
  marginRight: 5,
  // fontSize:
}

export const AccordionScreen = observer(function AccordionScreen() {
  const navigation = useNavigation()

  const [isCollapsed1, setIsCollapsed1] = useState(true)
  const [isCollapsed2, setIsCollapsed2] = useState(true)
  const [isChecked1, setIsChecked1] = useState(false)
  const [isChecked2, setIsChecked2] = useState(false)

  const animatedIconRotation1 = useRef(new Animated.Value(0)).current
  const animatedIconRotation2 = useRef(new Animated.Value(0)).current

  const spin = (animationValue) => {
    return animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["270deg", "90deg"],
    })
  }

  return (
    <View style={ROOT}>
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="ACCORDION WITHOUT REANIMATED"
        titleStyle={{ color: palette.black }}
        style={HEADER_STYLE}
      />
      <View style={CONTAINER}>
        <Text text="REGULAMINY" preset="header" />
        <View style={ITEM}>
          <View style={ITEM_HEADER}>
            <Text text="*" style={REQUIRED_TEXT} />
            <Checkbox onToggle={setIsChecked1} value={isChecked1} />
            <Text text={TERM_1_SHORT} />
            <Animated.View
              style={[{ marginLeft: 10 }, { transform: [{ rotate: spin(animatedIconRotation1) }] }]}
            >
              <Icon
                icon="leftArrow"
                size={15}
                onPress={() => {
                  setIsCollapsed1(!isCollapsed1)
                  Animated.timing(animatedIconRotation1, {
                    toValue: isCollapsed1 ? 1 : 0,
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: true,
                  }).start()
                }}
              />
            </Animated.View>
          </View>
          <Collapsible collapsed={isCollapsed1}>
            <Text text={TERM_1_LONG} />
          </Collapsible>
        </View>
        <View style={ITEM}>
          <View style={ITEM_HEADER}>
            {/* <Text text="*" style={REQUIRED_TEXT} /> */}
            <Checkbox onToggle={setIsChecked2} value={isChecked2} />
            <Text text={TERM_2_SHORT} />
            <Animated.View
              style={[{ marginLeft: 10 }, { transform: [{ rotate: spin(animatedIconRotation2) }] }]}
            >
              <Icon
                icon="leftArrow"
                size={15}
                onPress={() => {
                  setIsCollapsed2(!isCollapsed2)
                  Animated.timing(animatedIconRotation2, {
                    toValue: isCollapsed2 ? 1 : 0,
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: true,
                  }).start()
                }}
              />
            </Animated.View>
          </View>
          <Collapsible collapsed={isCollapsed2}>
            <Text text={TERM_2_LONG} />
            <Text text={TERM_2_SHORT} />
            <Text text={TERM_2_LONG} />
          </Collapsible>
        </View>
      </View>
    </View>
  )
})
