/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  AnimatedHomeScreen,
  ChessGameScreen,
  CircularProgressBarScreen,
  ColorPickerScreen,
  ColorsScreen,
  CustomScrollViewScreen,
  DoubleTapScreen,
  InfiniteTinderScreen,
  LiquidSwipeScreen,
  PanGestureScreen,
  PinchGesturesScreen,
  ReanimatedHomeScreen,
  ReflectlyColorSelectionScreen,
  ScrollViewScreen,
  SwipeToDeleteScreen,
  TinderCloneScreen,
  WelcomeScreen,
} from "../screens"
import { navigationRef } from "./navigation-utilities"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  WelcomeScreen: undefined

  // reanimated
  ReanimatedStack: undefined
  ReanimatedHomeScreen: undefined
  CircularProgressBarScreen: undefined
  ColorPickerScreen: undefined
  ColorsScreen: undefined
  ScrollViewScreen: undefined
  CustomScrollViewScreen: undefined
  DoubleTapScreen: undefined
  PinchGesturesScreen: undefined
  PanGestureScreen: undefined
  SwipeToDeleteScreen: undefined
  TinderCloneScreen: undefined
  InfiniteTinderScreen: undefined
  LiquidSwipeScreen: undefined
  ChessGameScreen: undefined
  ReflectlyColorSelectionScreen: undefined

  // animated
  AnimatedStack: undefined
  AnimatedHomeScreen: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const ReanimatedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ReanimatedHomeScreen"
    >
      <Stack.Screen name="ReanimatedHomeScreen" component={ReanimatedHomeScreen} />
      <Stack.Screen name="CircularProgressBarScreen" component={CircularProgressBarScreen} />
      <Stack.Screen name="ColorPickerScreen" component={ColorPickerScreen} />
      <Stack.Screen name="ColorsScreen" component={ColorsScreen} />
      <Stack.Screen name="ScrollViewScreen" component={ScrollViewScreen} />
      <Stack.Screen name="CustomScrollViewScreen" component={CustomScrollViewScreen} />
      <Stack.Screen name="DoubleTapScreen" component={DoubleTapScreen} />
      <Stack.Screen name="PinchGesturesScreen" component={PinchGesturesScreen} />
      <Stack.Screen name="PanGestureScreen" component={PanGestureScreen} />
      <Stack.Screen name="SwipeToDeleteScreen" component={SwipeToDeleteScreen} />
      <Stack.Screen name="TinderCloneScreen" component={TinderCloneScreen} />
      <Stack.Screen name="InfiniteTinderScreen" component={InfiniteTinderScreen} />
      <Stack.Screen name="LiquidSwipeScreen" component={LiquidSwipeScreen} />
      <Stack.Screen name="ChessGameScreen" component={ChessGameScreen} />
      <Stack.Screen
        name="ReflectlyColorSelectionScreen"
        component={ReflectlyColorSelectionScreen}
      />
    </Stack.Navigator>
  )
}
const AnimatedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="AnimatedHomeScreen"
    >
      <Stack.Screen name="AnimatedHomeScreen" component={AnimatedHomeScreen} />
    </Stack.Navigator>
  )
}
const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="WelcomeScreen"
    >
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="ReanimatedStack" component={ReanimatedStack} />
      <Stack.Screen name="AnimatedStack" component={AnimatedStack} />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["WelcomeScreen"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
