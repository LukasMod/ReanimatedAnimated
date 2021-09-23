import React, { FC } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen } from "../../components"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"

const FULL: ViewStyle = { flex: 1 }
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

export const AnimatedHomeScreen: FC<
  StackScreenProps<NavigatorParamList, "animatedHomeScreen">
> = observer(({ navigation }) => {
  const onBack = () => navigation.goBack()
  const nextScreen = () => navigation.navigate("welcome")

  return (
    <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
      <Header headerText="ANIMATED EXAMPLES" style={HEADER} leftIcon="back" onLeftPress={onBack} />
      {/* <Button style={CONTINUE} text="REANIMATED" onPress={nextScreen} /> */}
    </Screen>
  )
})
