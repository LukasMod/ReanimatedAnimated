import React, { FC, useRef, useEffect, useState } from "react"
import { ViewStyle, TextStyle, ScrollView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Button, Header } from "../../components"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"

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

export const ComponentsHomeScreen: FC<
  StackScreenProps<NavigatorParamList, "ComponentsHomeScreen">
> = observer(({ navigation }) => {
  const onBack = () => navigation.goBack()
  const AccordionScreen = () => navigation.navigate("AccordionScreen")

  const ref = useRef<ScrollView>()

  const [focus, setFocus] = useState(false)

  useEffect(() => {
    setFocus(navigation.isFocused())
    if (focus) {
      ref.current.scrollToEnd()
    }
  }, [navigation.isFocused, focus])

  return (
    <ScrollView style={CONTAINER} ref={ref}>
      <Header
        headerText="REANIMATED EXAMPLES"
        style={HEADER}
        leftIcon="back"
        onLeftPress={onBack}
      />
      <Button style={CONTINUE} text="ACCORDION" onPress={AccordionScreen} />
    </ScrollView>
  )
})
