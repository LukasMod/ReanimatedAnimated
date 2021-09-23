import React, { FC } from "react"
import { ViewStyle, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen } from "../../components"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
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

  return (
    <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
      <Header
        headerText="REANIMATED EXAMPLES"
        style={HEADER}
        leftIcon="back"
        onLeftPress={onBack}
      />
      <Button style={CONTINUE} text="CIRCULAR PROGRESS BAR" onPress={CircularProgressBarScreen} />
      <Button style={CONTINUE} text="COLOR PICKER" onPress={ColorPickerScreen} />
      <Button style={CONTINUE} text="COLORS ON/OFF" onPress={ColorsScreen} />
    </Screen>
  )
})
