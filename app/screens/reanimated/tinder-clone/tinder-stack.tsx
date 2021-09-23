import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, useWindowDimensions, Image, ImageStyle, StyleProp } from "react-native"
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"

export const LIKE = require("./../tinder-clone/LIKE.png")
export const NOPE = require("./../tinder-clone/nope.png")

const CARD_CONTAINER: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: "95%",
  height: "60%",
}

const NEXT_CARD: ViewStyle = {
  position: "absolute",
}

const IMAGE_STICKER: ImageStyle = {
  position: "absolute",
  width: 200,
  height: 200,
  resizeMode: "contain",

  top: -50,
}
const IMAGE_LIKE: ImageStyle = {
  ...IMAGE_STICKER,
  left: -50,
}
const IMAGE_NOPE: ImageStyle = {
  ...IMAGE_STICKER,
  right: -50,
}

type ContextType = {
  x: number
  y: number
}

const AnimatedImage = Animated.createAnimatedComponent(Image)

export interface TinderStackProps {
  style?: StyleProp<ViewStyle>
  data: any
  renderItem: (card) => JSX.Element
  onSwipeLeft
  onSwipeRight
}

export const TinderStack = observer(function TinderStack(props: TinderStackProps) {
  const { style, data, renderItem, onSwipeLeft, onSwipeRight } = props

  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(currentIndex + 1)

  const currentCard = data[currentIndex]
  const nextCard = data[nextIndex]

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions()
  const OUT_OF_SCREEN_TRANSLATE_X = SCREEN_WIDTH * 1.2
  const CARD_ROTATE = 60
  const SWIPE_VELOCITY = 800

  const translationX = useSharedValue(0)

  const setNextCard = () => {
    setCurrentIndex(currentIndex + 1)
  }

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (event, context) => {
      context.x = translationX.value
    },
    onActive: (event, context) => {
      translationX.value = event.translationX + context.x
    },
    onEnd: (event, context) => {
      // event.velocity on M1 IOS simulator === 0. Workaround with value only
      //   if (Platform.OS === "ios") {
      //     if (translationX.value > -SCREEN_WIDTH / 2 && translationX.value < SCREEN_WIDTH / 2) {
      //       translationX.value = withSpring(0)
      //     } else if (translationX.value < -SCREEN_WIDTH / 2) {
      //       translationX.value = withTiming(
      //         -OUT_OF_SCREEN_TRANSLATE_X,
      //         { duration: 300 },
      //         (isFinished) => {
      //           if (isFinished) {
      //             runOnJS(setNextCard)()
      //           }
      //         },
      //       )
      //     } else if (translationX.value > SCREEN_WIDTH / 2) {
      //       translationX.value = withTiming(
      //         OUT_OF_SCREEN_TRANSLATE_X,
      //         { duration: 300 },
      //         (isFinished) => {
      //           if (isFinished) {
      //             runOnJS(setNextCard)()
      //           }
      //         },
      //       )
      //     }
      //   } else {

      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
        translationX.value = withSpring(0)
        return
      }
      translationX.value = withTiming(
        OUT_OF_SCREEN_TRANSLATE_X * Math.sign(event.velocityX),
        { duration: 300 },
        (isFinished) => {
          if (isFinished) {
            runOnJS(setNextCard)()
            const onSwipe = event.velocityX > 0 ? onSwipeRight : onSwipeLeft
            runOnJS(onSwipe)(currentCard.name)
          }
        },
      )
    },
  })

  const rCardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translationX.value,
      [-SCREEN_WIDTH, SCREEN_WIDTH],
      [-CARD_ROTATE, CARD_ROTATE],
    )

    return {
      transform: [{ translateX: translationX.value }, { rotate: `${rotate}deg` }],
    }
  })

  const rNextCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translationX.value,
      [-OUT_OF_SCREEN_TRANSLATE_X, 0, OUT_OF_SCREEN_TRANSLATE_X],
      [1, 0.7, 1],
    )
    const opacity = interpolate(
      translationX.value,
      [-OUT_OF_SCREEN_TRANSLATE_X, 0, OUT_OF_SCREEN_TRANSLATE_X],
      [1, 0.8, 1],
    )

    return {
      transform: [{ scale }],
      opacity,
    }
  })

  const rLikeImageStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translationX.value, [20, OUT_OF_SCREEN_TRANSLATE_X / 4], [0, 1])

    return {
      opacity,
    }
  })
  const rNopeImageStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translationX.value, [-OUT_OF_SCREEN_TRANSLATE_X / 4, -20], [1, 0])

    return {
      opacity,
    }
  })

  useEffect(() => {
    translationX.value = 0
    if (data.length - 2 === currentIndex) {
      // setCurrentIndex(currentIndex)
      setNextIndex(0)
    } else if (data.length - 1 === currentIndex) {
      setCurrentIndex(0)
      setNextIndex(1)
    } else {
      setNextIndex(currentIndex + 1)
    }
  }, [currentIndex, translationX])

  return (
    <>
      {nextCard && (
        <Animated.View style={[CARD_CONTAINER, NEXT_CARD, rNextCardStyle]}>
          {renderItem(nextCard)}
        </Animated.View>
      )}

      {currentCard && (
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[CARD_CONTAINER, rCardStyle]}>
            {renderItem(currentCard)}
            <AnimatedImage source={LIKE} style={[IMAGE_LIKE, rLikeImageStyle]} />
            <AnimatedImage source={NOPE} style={[IMAGE_NOPE, rNopeImageStyle]} />
          </Animated.View>
        </PanGestureHandler>
      )}
    </>
  )
})
