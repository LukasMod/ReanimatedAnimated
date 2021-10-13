/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { Button, Header } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { palette } from "../../../theme/palette"

import * as LocalAuthentication from "expo-local-authentication"
import ReactNativeBiometrics from "react-native-biometrics"

const ROOT: ViewStyle = {
  flex: 1,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  // justifyContent: "center",
  // alignItems: "center",
  padding: 20,
}
const BUTTON: ViewStyle = {
  marginTop: 20,
}

const HEADER_STYLE: ViewStyle = {
  marginTop: 20,
  height: 70,
  elevation: 2,
  zIndex: 2,
}

export const AuthenticationScreen = observer(function AuthenticationScreen() {
  const navigation = useNavigation()

  // expo-local-authentication

  const biometricsAuthExpo = async () => {
    const support = await LocalAuthentication.supportedAuthenticationTypesAsync()
    console.log("support", support)
    const compatible = await LocalAuthentication.hasHardwareAsync()
    console.log("compatible", compatible)
    if (!compatible) throw "This device is not compatible for biometric authentication"
    const enrolled = await LocalAuthentication.isEnrolledAsync()
    console.log("enrolled", enrolled)
    if (!enrolled) throw `This device doesn't have biometric authentication enabled`
    const result = await LocalAuthentication.authenticateAsync()
    console.log("result", result)
    if (!result.success) throw `${result.error} - Authentication unsuccessful`
  }

  // react-native-biometrics

  const biometricsAuth = () => {
    ReactNativeBiometrics.isSensorAvailable().then((resultObject) => {
      const { available, biometryType } = resultObject

      if (available && biometryType === ReactNativeBiometrics.TouchID) {
        console.log("TouchID is supported")
      } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
        console.log("FaceID is supported")
      } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
        console.log("Biometrics is supported")
      } else {
        console.log("Biometrics not supported")
      }
    })
  }

  const createKeys = () => {
    ReactNativeBiometrics.createKeys("Confirm fingerprint").then((resultObject) => {
      const { publicKey } = resultObject
      console.log(publicKey)
    })
  }

  const biometricKeysExist = () => {
    ReactNativeBiometrics.biometricKeysExist().then((resultObject) => {
      const { keysExist } = resultObject

      if (keysExist) {
        console.log("Keys exist")
      } else {
        console.log("Keys do not exist or were deleted")
      }
    })
  }
  const deleteKeys = () => {
    ReactNativeBiometrics.deleteKeys().then((resultObject) => {
      const { keysDeleted } = resultObject

      if (keysDeleted) {
        console.log("Successful deletion")
      } else {
        console.log("Unsuccessful deletion because there were no keys to delete")
      }
    })
  }

  const epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString()
  const payload = epochTimeSeconds + "some message"

  const createSignature = () => {
    ReactNativeBiometrics.createSignature({
      promptMessage: "Sign in",
      payload: payload,
    }).then((resultObject) => {
      const { success, signature } = resultObject

      if (success) {
        console.log("signature", signature, "payload", payload)
      }
    })
  }

  const simplePrompt = () => {
    ReactNativeBiometrics.simplePrompt({ promptMessage: "Confirm fingerprint" })
      .then((resultObject) => {
        const { success } = resultObject

        if (success) {
          console.log("successful biometrics provided")
        } else {
          console.log("user cancelled biometric prompt")
        }
      })
      .catch(() => {
        console.log("biometrics failed")
      })
  }

  return (
    <View style={ROOT}>
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon={"back"}
        headerText="AUTHENTICATION"
        titleStyle={{ color: palette.black }}
        style={HEADER_STYLE}
      />
      <View style={CONTAINER}>
        {/* expo-local-authentication  */}
        <Button style={BUTTON} onPress={() => biometricsAuthExpo()} text="AUTH CHECK" />
        {/* react-native-biometrics */}
        <Button style={BUTTON} onPress={() => biometricsAuth()} text="AUTH CHECK" />
        <Button style={BUTTON} onPress={() => createKeys()} text="CREATE KEYS" />
        <Button style={BUTTON} onPress={() => biometricKeysExist()} text="CHECK IF KEY EXISTS" />
        <Button style={BUTTON} onPress={() => deleteKeys()} text="DELETE KEY" />
        <Button style={BUTTON} onPress={() => createSignature()} text="CREATE SIGNATURE (SECURED WITH KEY)" />
        <Button style={BUTTON} onPress={() => simplePrompt()} text="CREATE SIGNATURE (UNSECURED BOOLEAN)" />
      </View>
    </View>
  )
})
