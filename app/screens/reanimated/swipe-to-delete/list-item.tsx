import * as React from "react"
import { StyleProp, TextStyle, ViewStyle, Dimensions } from "react-native"
import { observer } from "mobx-react-lite"
import { flatten } from "ramda"
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from "react-native-gesture-handler"
import { TaskInterface } from "./swipe-to-delete-screen"
import { Text } from "../../../components"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"

const LIST_ITEM_HEIGHT = 70

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3

const CONTAINER: ViewStyle = {
  width: "100%",
  alignItems: "center",
}
const ICON_CONTAINER: ViewStyle = {
  height: LIST_ITEM_HEIGHT,
  width: LIST_ITEM_HEIGHT,
  position: "absolute",
  right: "10%",
  justifyContent: "center",
  alignItems: "center",
}
const TASK: ViewStyle = {
  width: "90%",
  height: LIST_ITEM_HEIGHT,
  justifyContent: "center",
  paddingLeft: 20,
  backgroundColor: "white",
  borderRadius: 10,
  shadowOpacity: 0.08,
  shadowOffset: {
    width: 0,
    height: 20,
  },
  shadowRadius: 10,
  elevation: 5,
}

const TASK_TEXT: TextStyle = {
  fontSize: 16,
}

export interface ListItemProps extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  style?: StyleProp<ViewStyle>
  task: TaskInterface
  onDismiss?: (task: TaskInterface) => void
}
export const ListItem = observer(function ListItem(props: ListItemProps) {
  const { style, task, onDismiss, simultaneousHandlers } = props
  const styles = flatten([CONTAINER, style])

  const translateX = useSharedValue(0)
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT)
  const marginVertical = useSharedValue(10)
  const opacity = useSharedValue(1)

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH)
        itemHeight.value = withTiming(0)
        marginVertical.value = withTiming(0)
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(task)
          }
        })
      } else {
        translateX.value = withTiming(0)
      }
    },
  })

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }))

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0)
    return { opacity }
  })

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    }
  })

  return (
    <Animated.View style={[styles, rTaskContainerStyle]}>
      <Animated.View style={[ICON_CONTAINER, rIconContainerStyle]}>
        <FontAwesomeIcon icon={faTrashAlt} size={LIST_ITEM_HEIGHT * 0.4} color={"red"} />
      </Animated.View>
      <PanGestureHandler simultaneousHandlers={simultaneousHandlers} onGestureEvent={panGesture}>
        <Animated.View style={[TASK, rStyle]}>
          <Text style={TASK_TEXT}>{task.title}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
})
