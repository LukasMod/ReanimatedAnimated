/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { Header } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"
import PINCode, { hasUserSetPinCode } from "@haskkor/react-native-pincode"

const ROOT: ViewStyle = {
  flex: 1,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  // justifyContent: "center",
  // alignItems: "center",
  padding: 20,
}

const HEADER_STYLE: ViewStyle = {
  marginTop: 20,
  height: 70,
  elevation: 2,
  zIndex: 2,
}

export const PincodeScreen = observer(function PincodeScreen() {
  const navigation = useNavigation()

  type PinStatusType = "choose" | "enter" | "locked"

  const [pinStatus, setPinStatus] = useState<PinStatusType>("locked")

  return (
    <View style={ROOT}>
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="PINCODE"
        titleStyle={{ color: palette.black }}
        style={HEADER_STYLE}
      />
      <View style={CONTAINER}>
        <PINCode
          status={pinStatus}
          stylePinCodeTextTitle={{ fontWeight: "normal" }}
          stylePinCodeTextSubtitle={{ fontWeight: "normal" }}
          stylePinCodeColorTitle={"black"}
          stylePinCodeColorSubtitle={"black"}
          stylePinCodeTextButtonCircle={{ fontWeight: "normal" }}
          stylePinCodeDeleteButtonText={{ fontWeight: "normal" }}
          textTitleLockedPage="blabla"
          stylePinCodeDeleteButtonColorHideUnderlay="red"
          // stylePinCodeDeleteButtonColorShowUnderlay="blue"
          styleMainContainer={{ opacity: 1 }}
          finishProcess={(event) => {
            console.log("finishProcess", event)
            setPinStatus("enter")
          }}
          endProcessFunction={(event) => {
            console.log("endProcessFunction", event)
          }}
          handleResultEnterPin={(event) => {
            console.log("handleResultEnterPin", event)
          }}
          onFail={(event) => {
            console.log("onFail", event)
          }}
        />
      </View>
    </View>
  )
})
