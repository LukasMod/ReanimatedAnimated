/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { TouchableOpacity, useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  AnimatedHomeScreen,
  ChanelScrollScreen,
  ChessGameScreen,
  ChromeDragScreen,
  CircularProgressBarScreen,
  CoffeeScrollScreen,
  ColorPickerScreen,
  ColorsScreen,
  CustomScrollViewScreen,
  DoubleTapScreen,
  DuolingoScreen,
  InfiniteTinderScreen,
  InfiniteTinderScreen2,
  LiquidSwipeScreen,
  MeasuresScreen,
  PanGestureScreen,
  PinchGesturesScreen,
  ReanimatedHomeScreen,
  ReflectlyColorSelectionScreen,
  ReflectlyTabbarScreen,
  ScrollViewScreen,
  StarsScreen,
  SwipeToDeleteScreen,
  TinderCloneScreen,
  WelcomeScreen,
} from "../screens"
import { navigationRef } from "./navigation-utilities"
import { SnapchatRoutes } from "../screens/reanimated/snapchat-shared-transitions/Model"
import Snapchat from "../screens/reanimated/snapchat-shared-transitions/Snapchat"
import Story from "../screens/reanimated/snapchat-shared-transitions/Story"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"
import TabComponent from "../screens/reanimated/bubble-tabbar/components/Tab"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import BubbleTabHome from "../screens/reanimated/bubble-tabbar/screens/Home"
import BubbleTabDocuments from "../screens/reanimated/bubble-tabbar/screens/Documents"
import BubbleTabLogger from "../screens/reanimated/bubble-tabbar/screens/Logger"
import BubbleTabMenu from "../screens/reanimated/bubble-tabbar/screens/Menu"
import { Icon } from "../components"
import { CircularProgressBarGradientScreen } from "../screens/reanimated/circular-progress-bar-gradient-screen/circular-progress-bar-gradient-screen"
import { GoogleMapsScreen } from "../screens/reanimated/google-maps/google-maps-screen"
import { MapItemsScreen } from "../screens/reanimated/map-items/map-items-screen"
import { ComponentsHomeScreen } from "../screens/components/components-home-screen"
import { AccordionScreen } from "../screens/components/accordion/accordion-screen"
import { PincodeScreen } from "../screens/components/pincode/pincode-screen"
import { AuthenticationScreen } from "../screens/components/authentication/authentication-screen"

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
  InfiniteTinderScreen2: undefined
  LiquidSwipeScreen: undefined
  ChessGameScreen: undefined
  ReflectlyColorSelectionScreen: undefined
  ReflectlyTabbarScreen: undefined
  ChanelScrollScreen: undefined
  CoffeeScrollScreen: undefined
  SnapchatSharedTransitionsScreen: undefined
  Story: { story: typeof Story }
  DuolingoScreen: undefined
  ChromeDragScreen: undefined
  StarsScreen: undefined
  MeasuresScreen: undefined
  BubbleTabbarScreen: undefined

  BubbleTabHome: undefined
  BubbleTabLogger: undefined
  BubbleTabDocuments: undefined
  BubbleTabMenu: undefined
  CircularProgressBarGradientScreen: undefined
  GoogleMapsScreen: undefined
  MapItemsScreen: undefined

  // animated
  AnimatedStack: undefined
  AnimatedHomeScreen: undefined

  // components
  ComponentsStack: undefined
  ComponentsHomeScreen: undefined
  AccordionScreen: undefined
  PincodeScreen: undefined
  AuthenticationScreen: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const StackSnapchat = createSharedElementStackNavigator<SnapchatRoutes>()
const SnapchatNavigator = () => (
  <StackSnapchat.Navigator
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
      cardOverlayEnabled: true,
      cardStyle: { backgroundColor: "transparent" },
      presentation: "modal",
    }}
  >
    <StackSnapchat.Screen name="Snapchat" component={Snapchat} />
    <StackSnapchat.Screen
      name="Story"
      component={Story}
      sharedElements={(route, otherRoute, showing) => {
        const { story } = route.params
        return [story.id]
      }}
    />
  </StackSnapchat.Navigator>
)

const BubbleTab = createBottomTabNavigator()

const BubbleTabStack = () => {
  return (
    <BubbleTab.Navigator
      initialRouteName="Home"
      screenOptions={(route) => ({
        headerLeft: ({}) => {
          return (
            <TouchableOpacity onPress={() => route.navigation.goBack()}>
              <Icon icon="back" />
            </TouchableOpacity>
          )
        },
      })}
    >
      <BubbleTab.Screen
        name="Home"
        component={BubbleTabHome}
        options={{
          tabBarButton: (props) => <TabComponent label="home" {...props} />,
        }}
      />
      <BubbleTab.Screen
        name="Logger"
        component={BubbleTabLogger}
        options={{
          tabBarButton: (props) => <TabComponent label="logger" {...props} />,
        }}
      />
      <BubbleTab.Screen
        name="Documents"
        component={BubbleTabDocuments}
        options={{
          tabBarButton: (props) => <TabComponent label="documents" {...props} />,
        }}
      />
      <BubbleTab.Screen
        name="Menu"
        component={BubbleTabMenu}
        options={{
          tabBarButton: (props) => <TabComponent label="menu" {...props} />,
        }}
      />
    </BubbleTab.Navigator>
  )
}

const ReanimatedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
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
      <Stack.Screen name="InfiniteTinderScreen2" component={InfiniteTinderScreen2} />
      <Stack.Screen name="LiquidSwipeScreen" component={LiquidSwipeScreen} />
      <Stack.Screen name="ChessGameScreen" component={ChessGameScreen} />
      <Stack.Screen
        name="ReflectlyColorSelectionScreen"
        component={ReflectlyColorSelectionScreen}
      />
      <Stack.Screen name="ReflectlyTabbarScreen" component={ReflectlyTabbarScreen} />
      <Stack.Screen name="ChanelScrollScreen" component={ChanelScrollScreen} />
      <Stack.Screen name="CoffeeScrollScreen" component={CoffeeScrollScreen} />
      <Stack.Screen name="SnapchatSharedTransitionsScreen" component={SnapchatNavigator} />
      <Stack.Screen name="DuolingoScreen" component={DuolingoScreen} />
      <Stack.Screen name="ChromeDragScreen" component={ChromeDragScreen} />
      <Stack.Screen name="StarsScreen" component={StarsScreen} />
      <Stack.Screen name="MeasuresScreen" component={MeasuresScreen} />
      <Stack.Screen name="BubbleTabbarScreen" component={BubbleTabStack} />
      <Stack.Screen
        name="CircularProgressBarGradientScreen"
        component={CircularProgressBarGradientScreen}
      />
      <Stack.Screen name="GoogleMapsScreen" component={GoogleMapsScreen} />
      <Stack.Screen name="MapItemsScreen" component={MapItemsScreen} />
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
const ComponentsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ComponentsHomeScreen"
    >
      <Stack.Screen name="ComponentsHomeScreen" component={ComponentsHomeScreen} />
      <Stack.Screen name="AccordionScreen" component={AccordionScreen} />
      <Stack.Screen name="PincodeScreen" component={PincodeScreen} />
      <Stack.Screen name="AuthenticationScreen" component={AuthenticationScreen} />
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
      <Stack.Screen name="ComponentsStack" component={ComponentsStack} />
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
