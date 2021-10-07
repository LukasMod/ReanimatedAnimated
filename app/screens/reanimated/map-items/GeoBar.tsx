/* eslint-disable react-native/no-color-literals */
import React from "react"
import { SafeAreaView, StyleSheet, useWindowDimensions, View } from "react-native"
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import {
  faTrashAlt,
  faAlignJustify,
  faAllergies,
  faAmbulance,
  faArchway,
} from "@fortawesome/free-solid-svg-icons"

export default function GeoBar({ panY }) {
  const { height } = useWindowDimensions()

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(panY.value, [-100, 0], [-100, 0], Extrapolate.CLAMP),
        },
      ],
    }
  })

  const ICON_COLOR = "black"

  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <Animated.View style={[styles.container, { marginBottom: height * 0.1 + 15 }, animatedStyle]}>
        <View style={[styles.icon, styles.iconMargin]}>
          <FontAwesomeIcon icon={faTrashAlt} size={28} color={ICON_COLOR} />
        </View>

        <View style={styles.icon}>
          <FontAwesomeIcon icon={faAllergies} size={28} color={ICON_COLOR} />
        </View>
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    bottom: 0,
    left: 0,
    marginHorizontal: "5%",
    position: "absolute",
    right: 0,
  },
  icon: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: 50,
  },
  iconMargin: {
    marginBottom: 15,
  },
})
