import React, { useState } from "react"

import Slider from "./Slider"
import Slide from "./Slide"
import { Header } from "../../../components"
import { useNavigation } from "@react-navigation/core"
import { ViewStyle } from "react-native"

// https://www.youtube.com/watch?v=6jxy5wfNpk0&list=PLkOyNuxGl9jxB_ARphTDoOWf5AE1J-x1r&index=1

const slides = [
  {
    color: "#F2A1AD",
    title: "Dessert Recipes",
    description: "Hot or cold, our dessert recipes can turn an average meal into a memorable event",
    picture: require("./assets/1.png"),
  },
  {
    color: "#0090D6",
    title: "Healthy Foods",
    description:
      "Discover healthy recipes that are easy to do with detailed cooking instructions from top chefs",
    picture: require("./assets/5.png"),
  },
  {
    color: "#69C743",
    title: "Easy Meal Ideas",
    description: "explore recipes by food type, preparation method, cuisine, country and more",
    picture: require("./assets/4.png"),
  },
  {
    color: "#FB3A4D",
    title: "10000+ Recipes",
    description:
      "Browse thousands of curated recipes from top chefs, each with detailled cooking instructions",
    picture: require("./assets/2.png"),
  },
  {
    color: "#F2AD62",
    title: "Video Tutorials",
    description: "Browse our best themed recipes, cooking tips, and how-to food video & photos",
    picture: require("./assets/3.png"),
  },
]

const HEADER_ABSOLUTE: ViewStyle = {
  position: "absolute",
  width: "100%",
  top: 20,
  height: 70,
  elevation: 2,
  zIndex: 2,
}

export const LiquidSwipeScreen = () => {
  const navigation = useNavigation()
  const [index, setIndex] = useState(1)
  const prev = slides[index - 1]
  const next = slides[index + 1]
  return (
    <>
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="LIQUID SWIPE"
        style={HEADER_ABSOLUTE}
      />
      <Slider
        key={index}
        index={index}
        setIndex={setIndex}
        prev={prev && <Slide slide={prev} />}
        next={next && <Slide slide={next} />}
      >
        <Slide slide={slides[index]!} />
      </Slider>
    </>
  )
}
