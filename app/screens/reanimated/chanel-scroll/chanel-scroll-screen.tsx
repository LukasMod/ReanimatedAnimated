import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { Header } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  ScrollView,
} from "react-native-gesture-handler"

import Item, { MAX_HEIGHT } from "./Item"
import { items } from "./Model"
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { clamp, snapPoint } from "react-native-redash"

// https://www.youtube.com/watch?v=ucpoqa2-74s&list=PLkOyNuxGl9jxB_ARphTDoOWf5AE1J-x1r&index=6

const ROOT: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  height: items.length * MAX_HEIGHT,
  backgroundColor: "black",
}

const HEADER_STYLE: ViewStyle = {
  position: "absolute",
  width: "100%",
  top: 20,
  height: 70,
  elevation: 2,
  zIndex: 2,
}

const snapPoints = items.map((_, i) => i * -MAX_HEIGHT)

export const ChanelScrollScreen = observer(function ChanelScrollScreen() {
  const navigation = useNavigation()

  const y = useSharedValue(0)

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y: value } }) => {
      y.value = value
      console.log(value)
    },
  })

  type Context = {
    y: number
  }

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, Context>({
    onStart: (event, ctx) => {
      ctx.y = y.value
    },

    onActive: (event, ctx) => {
      y.value = clamp(ctx.y + event.translationY, -(items.length - 1) * MAX_HEIGHT, 0)
    },
    onEnd: (event, ctx) => {
      const dest = snapPoint(y.value, event.velocityY, snapPoints)
      y.value = withSpring(dest, { velocity: event.velocityY })
    },
  })

  return (
    <View style={ROOT}>
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="Reanimated Chanel"
        titleStyle={{ color: palette.black }}
        style={HEADER_STYLE}
      />
      {/* VERSION WITH PAN GESTURE HANDLER */}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View>
          {items.map((item, index) => (
            <Item item={item} key={index} index={index} y={y} />
          ))}
        </Animated.View>
      </PanGestureHandler>

      {/* VERSION WITH ANIMATED SCROLLVIEW */}

      {/* <Animated.ScrollView   
        style={CONTAINER}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ height: (items.length + 1) * MAX_HEIGHT }}
        snapToInterval={MAX_HEIGHT}
        decelerationRate="fast"
      >
        {items.map((item, index) => (
          <Item item={item} key={index} index={index} y={y} />
        ))}
      </Animated.ScrollView> */}
    </View>
  )
})
