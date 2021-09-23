import * as React from "react"
import { ImageBackground, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../../theme"
import { flatten } from "ramda"
import { palette } from "../../../theme/palette"
import { Text } from "../../../components"

// const CARD_ROTATE = 60

const CARD: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  borderRadius: 10,

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.36,
  shadowRadius: 6.68,

  elevation: 11,
  backgroundColor: palette.offWhite,
}

const BIO_WRAPPER: ViewStyle = {
  padding: 20,
}

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }

const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
}
const DESCRIPTION: TextStyle = {
  ...TEXT,
  fontSize: 18,
  lineHeight: 25,
}

const IMAGE: ImageStyle = {
  width: "100%",
  height: "100%",
  borderRadius: 10,
  overflow: "hidden",
  justifyContent: "flex-end",
}

export interface TinderCardProps {
  style?: StyleProp<ViewStyle>
  tinderCard: any
}

export const TinderCard = observer(function TinderCard(props: TinderCardProps) {
  const { style, tinderCard } = props
  const styles = flatten([CARD, style])

  return (
    <View style={styles}>
      <ImageBackground source={{ uri: tinderCard.image }} style={IMAGE}>
        <View style={BIO_WRAPPER}>
          <Text style={TITLE} text={tinderCard.id} />
          <Text style={TITLE} text={tinderCard.name} />
          <Text style={DESCRIPTION} text={tinderCard.bio} />
        </View>
      </ImageBackground>
    </View>
  )
})
