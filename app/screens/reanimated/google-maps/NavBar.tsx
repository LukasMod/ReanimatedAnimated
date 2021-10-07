/* eslint-disable react-native/no-color-literals */
import React from "react"
import { StyleSheet, useWindowDimensions, View } from "react-native"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import {
  faTrashAlt,
  faAlignJustify,
  faAllergies,
  faAmbulance,
  faArchway,
} from "@fortawesome/free-solid-svg-icons"

export default function NavBar({ panY }) {
  const { height } = useWindowDimensions()

  const animatedStyle = useAnimatedStyle(() => {
    const hidden = panY.value > -(height / 3)

    return {
      opacity: withTiming(hidden ? 0 : 1),
    }
  })

  const ICON_COLOR = "white"

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.container, animatedStyle]}>
      <View style={styles.icon}>
        <FontAwesomeIcon icon={faArchway} size={28} color={ICON_COLOR} />
      </View>
      <View style={styles.rightIcons}>
        <View style={[styles.icon, styles.iconMargin]}>
          <FontAwesomeIcon icon={faAlignJustify} size={28} color={ICON_COLOR} />
        </View>
        <View style={styles.icon}>
          <FontAwesomeIcon icon={faAmbulance} size={28} color={ICON_COLOR} />
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "5%",
    marginTop: 10,
  },
  icon: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    paddingLeft: 2,
    width: 40,
  },
  iconMargin: {
    marginRight: 10,
  },
  rightIcons: {
    flexDirection: "row",
  },
})
