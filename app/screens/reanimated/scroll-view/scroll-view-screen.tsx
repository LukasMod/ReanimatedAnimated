import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Header, Screen } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"
import { ScrollViewPage } from "./scroll-view-page"

// https://www.youtube.com/watch?v=SqwpRr7kbnQ&list=PLjHsmVtnAr9TWoMAh-3QMiP7bPUqPFuFZ&index=3

const ROOT: ViewStyle = {
  flex: 1,
}

const CONTAINER: ViewStyle = {
  flex: 1,
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

export const ScrollViewScreen = observer(function ScrollViewScreen() {
  const navigation = useNavigation()

  const translateX = useSharedValue(1)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x
  })

  return (
    <Screen style={ROOT} preset="fixed" unsafe>
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="Reanimated ScrollView and interpolation"
        titleStyle={{ color: palette.black }}
        style={HEADER_ABSOLUTE}
      />
      <Animated.ScrollView
        horizontal
        style={CONTAINER}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        pagingEnabled
      >
        {WORDS.map((title, index) => {
          return (
            <ScrollViewPage
              key={index.toString()}
              title={title}
              index={index}
              translateX={translateX}
            />
          )
        })}
      </Animated.ScrollView>
    </Screen>
  )
})
