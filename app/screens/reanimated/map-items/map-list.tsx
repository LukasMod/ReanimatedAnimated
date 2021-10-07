/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useState, useRef } from "react"
import { StyleSheet, View, ViewStyle } from "react-native"

import MapItem, {
  ITEM_MARGIN,
  ITEM_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "./map-item"
import Carousel from "react-native-snap-carousel"


export const LIST_ITEM_WIDTH = ITEM_WIDTH + ITEM_MARGIN * 2 
export const LIST_MARGIN = SCREEN_WIDTH * 0.01
export const MAX_HEIGHT = SCREEN_HEIGHT * 0.6

export default function MapList(props) {
  const { panY } = props

  const [isGestureActive, setIsGestureActive] = useState(false)
  const [currentIndex, setCurrentOffer] = useState(0)

  const renderCarouselItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <MapItem
        data={item}
        index={index}
        dataLength={props.data.length}
        panY={props.panY}
        opened={currentIndex === index}
        setIsGestureActive={setIsGestureActive}
        isGestureActive={isGestureActive}
      />
    )
  }

  const spotSwipeRef = useRef<Carousel>(null)

  // const memoizedValue = useMemo(() => renderCarouselItem, [props.data]);

  return (
    <View style={CONTAINER}>
      <Carousel
        ref={spotSwipeRef}
        data={props.data}
        keyExtractor={(item) => item.id}
        renderItem={renderCarouselItem}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={LIST_ITEM_WIDTH}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        activeSlideAlignment="center"
        contentContainerCustomStyle={styles.contentStyle}
        decelerationRate={0.9}
        removeClippedSubviews={false}
        enableMomentum={true}
        panY={panY}
        scrollEnabled={!isGestureActive}
        onSnapToItem={(index) => {
          setCurrentOffer(index)
        }}
      />
    </View>
  )
}

const CONTAINER: ViewStyle = {

  height: SCREEN_HEIGHT,
  width: SCREEN_WIDTH,
  // backgroundColor: "rgba(248,255,138, 0.6)",
  position: "absolute",
  bottom: 30,
  left: 0,
}

const styles = StyleSheet.create({
  contentStyle: {
    alignItems: "flex-end",
    marginHorizontal: LIST_MARGIN,
  },
  flatList: {
    bottom: 0,
    position: "absolute",
  },
})
