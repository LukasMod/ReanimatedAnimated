import React, { useCallback, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle } from "react-native"
import Animated, {
  useDerivedValue,
  useSharedValue,
  withTiming,
  useAnimatedProps,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  withSequence,
} from "react-native-reanimated"
import Svg, { Circle, Defs, G, LinearGradient, Path, Stop } from "react-native-svg"
import { ReText } from "react-native-redash"
import { Text } from "../../../components"

const { PI, sin, cos } = Math

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedPath = Animated.createAnimatedComponent(Path)

interface CircularProgressBarGradientProps {
  // color progress bar width
  strokeWidthInner: number

  // creates extra border around progress bar
  strokeWidthOuter: number

  // height === width === size
  size: number

  // backgroundColor progress bar
  backgroundStrokeColor: string

  // array of colors for progress bar
  colors: string[]

  // use it to make interpolation more smooth (bigger adjustSampling => more arcs to render!)
  adjustSampling?: number

  // new progress value (1 === 1 level and 360 deg)
  newValue: number

  // disable eg. button while animation is in progress
  setBlocked: (blocked: boolean) => void
}

export const CircularProgressBarGradient = observer(function CircularProgressBarGradient(
  props: CircularProgressBarGradientProps,
) {
  const {
    newValue,
    colors,
    strokeWidthInner,
    strokeWidthOuter,
    size,
    backgroundStrokeColor,
    adjustSampling = 2,
    setBlocked,
  } = props

  const R = size / 2 - strokeWidthInner / 2
  const CIRCLE_LENGTH = 2 * PI * R
  const CX = size / 2 + strokeWidthOuter / 4
  const CY = size / 2 + strokeWidthOuter / 4
  const x = (alfa: number) => CX - R * cos(alfa)
  const y = (alfa: number) => CY - R * sin(alfa)
  const A = PI * 2
  const sampling = adjustSampling ? colors.length * adjustSampling : colors.length
  const step = A / sampling
  const arc = (α: number) => `A ${R} ${R} 0 0 1 ${x(α)} ${y(α)}`
  const arcs = new Array(sampling).fill(0).map((_0, i) => {
    const α = i * step
    return `M ${x(α)} ${y(α)} ${arc(α + step)}`
  })

  const progress = useSharedValue(0)

  const [newProgress, setNewProgress] = useState(0)
  const [level, setLevel] = useState(Math.trunc(newValue))


  useEffect(() => {
    const roundValue = newValue - level >= 1 ? 1 : Math.round((newValue % 1) * 100) / 100
    setNewProgress(roundValue)
  }, [newValue, level])

  useEffect(() => {
    if (newProgress) {
      setBlocked(true)
      progress.value = withTiming(newProgress, { duration: 1000 }, () => {
        if (newProgress === 1) {
          runOnJS(setLevel)(level + 1)

          // go back when reach a level
          // progress.value = withTiming(0, { duration: 200 })

          // start from 0 when reach a level
          progress.value = 0
        }
        runOnJS(setBlocked)(false)
      })
    }
  }, [newProgress])

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`
  })

  const animatedProps = useAnimatedProps(() => {
    const α = (1 - progress.value) * PI * 2
    const strokeDashoffset = CIRCLE_LENGTH - α * -R
    return {
      strokeDashoffset,
    }
  })

  const inputArray = new Array(...colors).map((_, i) => {
    return i / (colors.length - 1)
  })

  const gradientStrokeColor = (value) => {
    const color = interpolateColor(value, inputArray, colors)
    return color
  }

  const R_TEXT = useAnimatedStyle(() => {
    const color = interpolateColor(progress.value, inputArray, colors)
    return {
      color,
      fontSize: size / 4,
    }
  })

  const CIRCLE: ViewStyle = {
    position: "absolute",
    height: size + strokeWidthOuter / 2,
    width: size + strokeWidthOuter / 2,
    transform: [{ rotateZ: "-90deg" }],
  }

  return (
    <>
      <Text text={`newValue: ${Math.round(newValue * 100) / 100}`} />
      <Text text={`newProgress: ${newProgress}`} />
      <Text text={`level: ${level}`} />
      <ReText text={progressText} style={R_TEXT} />
      <Svg style={CIRCLE}>
        <Defs>
          {arcs.map((d, key) => {
            const isReversed = key / sampling >= 0.5

            return (
              <LinearGradient key={key} id={`gradient-${key}`}>
                <Stop
                  stopColor={gradientStrokeColor(key / sampling)}
                  offset={`${isReversed ? 100 : 0}%`}
                />
                <Stop
                  stopColor={gradientStrokeColor((key + 1) / sampling)}
                  offset={`${isReversed ? 0 : 100}%`}
                />
              </LinearGradient>
            )
          })}
        </Defs>
        <Circle
          cx={CX}
          cy={CY}
          r={R}
          stroke={backgroundStrokeColor}
          strokeWidth={strokeWidthOuter}
        />
        <G transform={`translate(${CX}, ${CY}) rotate(180) translate(${-CX}, ${-CY})`}>
          {arcs.map((d, key) => (
            <AnimatedPath
              key={key}
              stroke={`url(#gradient-${key})`}
              fill="transparent"
              strokeWidth={strokeWidthInner}
              d={d}
            />
          ))}
        </G>
        <AnimatedCircle
          fill="transparent"
          strokeDasharray={CIRCLE_LENGTH}
          stroke={backgroundStrokeColor}
          cx={CX}
          cy={CY}
          r={R}
          strokeWidth={strokeWidthInner + 2}
          animatedProps={animatedProps}
        />
      </Svg>
    </>
  )
})
