/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/no-color-literals */
import React from "react"
import { StyleSheet, View, ViewStyle } from "react-native"
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"
import MapItem, { ITEM_HEIGHT, ITEM_MARGIN, ITEM_WIDTH, SCREEN_WIDTH } from "./map-item"

type ContextType = {
  startY: number
}

export const LIST_ITEM_WIDTH = ITEM_WIDTH + ITEM_MARGIN * 2
export const LIST_MARGIN = SCREEN_WIDTH * 0.01

export default function MapList(props) {
  const translateX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x
  })

  return (
    <Animated.ScrollView
      horizontal
      style={CONTAINER}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      pagingEnabled
      contentContainerStyle={CONTAINER_CONTENT}
      decelerationRate={0}
      snapToInterval={LIST_ITEM_WIDTH}
      snapToAlignment={"center"}
      //   contentOffset={{ x: -ITEM_MARGIN * 2, y: 0 }}
    >
      {props.data.map((item, index) => (
        <View style={WRAPPER} key={item.id}>
          <MapItem data={item} index={index} dataLength={props.data.length} panY={props.panY} />
        </View>
      ))}
    </Animated.ScrollView>
  )
}

const CONTAINER: ViewStyle = {
  //   flex: 1,
  position: "absolute",
  bottom: 30,
  left: 0,
}

const WRAPPER: ViewStyle = {
  width: ITEM_WIDTH,
  marginHorizontal: ITEM_MARGIN,
  backgroundColor: "rgba(0,256,256, 0.2)",
}

const CONTAINER_CONTENT: ViewStyle = {
  paddingLeft: ITEM_MARGIN * 2,
}
