/* eslint-disable react-native/no-color-literals */

import React from "react"
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import Animated, {
  useAnimatedRef,
  measure,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
  runOnUI,
} from "react-native-reanimated"

import Chevron from "./Chevron"
import Item, { ListItemModel } from "./ListItem"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    padding: 16,
  },
  items: {
    overflow: "hidden",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
})

export interface ListModel {
  name: string
  items: ListItemModel[]
}

interface ListProps {
  list: ListModel
}

const List = ({ list }: ListProps) => {
  const aref = useAnimatedRef<View>()
  const open = useSharedValue(false)
  const progress = useDerivedValue(() => (open.value ? withSpring(1) : withTiming(0)))
  const height = useSharedValue(0)
  const headerStyle = useAnimatedStyle(() => ({
    borderBottomLeftRadius: progress.value === 0 ? 8 : 0,
    borderBottomRightRadius: progress.value === 0 ? 8 : 0,
  }))
  const style = useAnimatedStyle(() => ({
    height: height.value * progress.value + 1,
    opacity: progress.value === 0 ? 0 : 1,
  }))
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          if (height.value === 0) {
            runOnUI(() => {
              "worklet"
              height.value = measure(aref).height
            })()
          }
          open.value = !open.value
        }}
      >
        <Animated.View style={[styles.container, headerStyle]}>
          <Text style={styles.title}>Total Points</Text>
          <Chevron {...{ progress }} />
        </Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, style]}>
        <View ref={aref}>
          {list.items.map((item, key) => (
            <Item key={key} isLast={key === list.items.length - 1} {...{ item }} />
          ))}
        </View>
      </Animated.View>
    </>
  )
}

export default List
