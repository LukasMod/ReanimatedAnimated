import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions } from "react-native"
import { Header, Screen } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from "react-native-reanimated"

import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import { ReanimatedCustomScrollViewPage } from "./reanimated-custom-scroll-view-page"

// https://www.youtube.com/watch?v=Fd5FWxx7c48

const ROOT: ViewStyle = {
  flex: 1,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  flexDirection: "row",
}
const HEADER_ABSOLUTE: ViewStyle = {
  position: "absolute",
  width: "100%",
  top: 20,
  height: 70,
  backgroundColor: palette.offWhite,
  elevation: 2,
  zIndex: 2,
}

const WORDS = ["Lets", "try", "reanimated", "2"]

type ContextType = {
  x: number
}
const { width: PAGE_WIDTH } = Dimensions.get("window")

const MAX_TRANSLATE_X = -PAGE_WIDTH * (WORDS.length - 1)

export const CustomScrollViewScreen = observer(function CustomScrollViewScreen() {
  const navigation = useNavigation()

  const translateX = useSharedValue(0)

  const clampedTranslateX = useDerivedValue(() => {
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X)
  })

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (_, context) => {
      context.x = clampedTranslateX.value
      cancelAnimation(translateX)
    },
    onActive: (event, context) => {
      console.log(event.velocityX)
      translateX.value = event.translationX + context.x
    },
    onEnd: (event) => {
      console.log(event.velocityX)

      translateX.value = withDecay({ velocity: event.velocityX })
    },
  })

  return (
    <Screen style={ROOT} preset="fixed" unsafe>
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="6. Reanimated - Custom ScrollView"
        titleStyle={{ color: palette.black }}
        style={HEADER_ABSOLUTE}
      />
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={CONTAINER}>
          {WORDS.map((title, index) => {
            return (
              <ReanimatedCustomScrollViewPage
                key={index.toString()}
                title={title}
                index={index}
                translateX={clampedTranslateX}
              />
            )
          })}
        </Animated.View>
      </PanGestureHandler>
    </Screen>
  )
})
