import { Dimensions } from "react-native"

export interface StarData {
  id: number
  x: number
  y: number
}

export const stars: StarData[] = []
export const starCount = 30

const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

for (let i = 0; i < starCount; i++) {
  stars.push({
    id: i,
    // x: windowWidth / 2 + windowWidth * (Math.random() - 0.5),
    // y: windowHeight / 2 + windowHeight * (Math.random() - 0.5),
    x: Math.random() - 0.5,
    y: Math.random() - 0.5,
  })
}
