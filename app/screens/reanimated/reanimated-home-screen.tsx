import React, { FC, useRef } from "react"
import { ViewStyle, TextStyle, ScrollView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Button, Header } from "../../components"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { useFocusEffect } from "@react-navigation/core"
import { delay } from "../../utils/delay"

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  marginTop: 50,
  marginBottom: 20,
}
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}

const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
  marginVertical: spacing[2],
}

export const ReanimatedHomeScreen: FC<
  StackScreenProps<NavigatorParamList, "ReanimatedHomeScreen">
> = observer(({ navigation }) => {
  const onBack = () => navigation.goBack()
  const CircularProgressBarScreen = () => navigation.navigate("CircularProgressBarScreen")
  const ColorPickerScreen = () => navigation.navigate("ColorPickerScreen")
  const ColorsScreen = () => navigation.navigate("ColorsScreen")
  const ScrollViewScreen = () => navigation.navigate("ScrollViewScreen")
  const CustomScrollViewScreen = () => navigation.navigate("CustomScrollViewScreen")
  const DoubleTapScreen = () => navigation.navigate("DoubleTapScreen")
  const PinchGesturesScreen = () => navigation.navigate("PinchGesturesScreen")
  const PanGestureScreen = () => navigation.navigate("PanGestureScreen")
  const SwipeToDeleteScreen = () => navigation.navigate("SwipeToDeleteScreen")
  const TinderCloneScreen = () => navigation.navigate("TinderCloneScreen")
  const InfiniteTinderScreen = () => navigation.navigate("InfiniteTinderScreen")
  const LiquidSwipeScreen = () => navigation.navigate("LiquidSwipeScreen")
  const ChessGameScreen = () => navigation.navigate("ChessGameScreen")
  const ReflectlyColorSelectionScreen = () => navigation.navigate("ReflectlyColorSelectionScreen")
  const ReflectlyTabbarScreen = () => navigation.navigate("ReflectlyTabbarScreen")
  const ChanelScrollScreen = () => navigation.navigate("ChanelScrollScreen")
  const CoffeeScrollScreen = () => navigation.navigate("CoffeeScrollScreen")
  const SnapchatSharedTransitionsScreen = () =>
    navigation.navigate("SnapchatSharedTransitionsScreen")

  const ref = useRef<ScrollView>()

  useFocusEffect(
    React.useCallback(() => {
      delay(500).then(() => {
        ref.current.scrollToEnd()
      })
    }, []),
  )

  return (
    <ScrollView style={CONTAINER} ref={ref}>
      <Header
        headerText="REANIMATED EXAMPLES"
        style={HEADER}
        leftIcon="back"
        onLeftPress={onBack}
      />
      <Button style={CONTINUE} text="CIRCULAR PROGRESS BAR" onPress={CircularProgressBarScreen} />
      <Button style={CONTINUE} text="COLOR PICKER" onPress={ColorPickerScreen} />
      <Button style={CONTINUE} text="COLORS ON/OFF" onPress={ColorsScreen} />
      <Button style={CONTINUE} text="SCROLL VIEW" onPress={ScrollViewScreen} />
      <Button style={CONTINUE} text="CUSTOM SCROLL VIEW" onPress={CustomScrollViewScreen} />
      <Button style={CONTINUE} text="DOUBLE TAP" onPress={DoubleTapScreen} />
      <Button style={CONTINUE} text="PINCH GESTURE" onPress={PinchGesturesScreen} />
      <Button style={CONTINUE} text="PAN GESTURE" onPress={PanGestureScreen} />
      <Button style={CONTINUE} text="SWIPE TO DELETE" onPress={SwipeToDeleteScreen} />
      <Button style={CONTINUE} text="TINDER CLONE" onPress={TinderCloneScreen} />
      <Button style={CONTINUE} text="INFINITE TINDER" onPress={InfiniteTinderScreen} />
      <Button style={CONTINUE} text="LIQUID SWIPE" onPress={LiquidSwipeScreen} />
      <Button style={CONTINUE} text="CHESS GAME" onPress={ChessGameScreen} />
      <Button
        style={CONTINUE}
        text="REFLECTLY COLOR SELECTION"
        onPress={ReflectlyColorSelectionScreen}
      />
      <Button style={CONTINUE} text="REFLECTLY TABBAR" onPress={ReflectlyTabbarScreen} />
      <Button style={CONTINUE} text="CHANEL SCROLL" onPress={ChanelScrollScreen} />
      <Button style={CONTINUE} text="COFFEE SCROLL" onPress={CoffeeScrollScreen} />
      <Button
        style={CONTINUE}
        text="SNAPCHAT SHARED TRANSITIONS"
        onPress={SnapchatSharedTransitionsScreen}
      />
    </ScrollView>
  )
})
