import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions, View, ScrollView } from "react-native"
import { Header } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"
import { products } from "./Model"
import Card, { CARD_HEIGHT } from "./Card"
import Products from "./Products"
import Cards from "./components/Cards"
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated"

// https://www.youtube.com/watch?v=rWwz9WO-hCo&list=PLkOyNuxGl9jxB_ARphTDoOWf5AE1J-x1r&index=9

const { width } = Dimensions.get("window")

const ROOT: ViewStyle = {
  flex: 1,
}

const SLIDER: ViewStyle = {
  height: CARD_HEIGHT,
}

const HEADER_ABSOLUTE: ViewStyle = {
  // position: "absolute",
  width: "100%",
  top: 20,
  height: 70,
  elevation: 2,
  zIndex: 2,
}

const snapToOffsets = [0, CARD_HEIGHT]

export const CoffeeScrollScreen = observer(function CoffeeScrollScreen() {
  const navigation = useNavigation()

  const translateX = useSharedValue(0)
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { x } }) => {
      translateX.value = x
    },
  })

  const R_ROOT = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        translateX.value,
        products.map((_, index) => index * width),
        products.map((product) => product.color2),
      ),
    }
  })

  return (
    <Animated.View style={[ROOT, R_ROOT]}>
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="Reanimated Coffee Scroll"
        titleStyle={{ color: palette.black }}
        style={HEADER_ABSOLUTE}
      />
      <ScrollView
        decelerationRate="fast"
        snapToOffsets={snapToOffsets}
        bounces={false}
        showsVerticalScrollIndicator={false}
        snapToEnd={false}
      >
        <View style={SLIDER}>
          <Animated.ScrollView
            decelerationRate="fast"
            snapToInterval={width}
            showsHorizontalScrollIndicator={false}
            horizontal
            scrollEventThrottle={16}
            onScroll={onScroll}
          >
            {products.map((product, index) => (
              <Card product={product} key={index} />
            ))}
          </Animated.ScrollView>
          <Products x={translateX} />
        </View>
        <Cards />
      </ScrollView>
    </Animated.View>
  )
})
