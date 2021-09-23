import { ImageSourcePropType } from "react-native"

export type ProfileModel = {
  id: string
  name: string
  age: number
  profile: ImageSourcePropType
}

export const profilesData: ProfileModel[] = [
  {
    id: "1" + Math.random(),
    name: "Caroline",
    age: 24,
    profile: require("./profiles/1.jpg"),
  },
  {
    id: "2" + Math.random(),
    name: "Jack",
    age: 30,
    profile: require("./profiles/2.jpg"),
  },
  {
    id: "3" + Math.random(),
    name: "Anet",
    age: 21,
    profile: require("./profiles/3.jpg"),
  },
  {
    id: "4" + Math.random(),
    name: "John",
    age: 28,
    profile: require("./profiles/4.jpg"),
  },
]
