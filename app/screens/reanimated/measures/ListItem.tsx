/* eslint-disable react-native/no-color-literals */
import React from "react"
import { StyleSheet, Text, View } from "react-native"

const LIST_ITEM_HEIGHT = 54
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#f4f4f6",
    flexDirection: "row",
    height: LIST_ITEM_HEIGHT,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  name: {
    fontSize: 16,
  },
  points: {
    color: "white",
    fontWeight: "bold",
  },
  pointsContainer: {
    backgroundColor: "#44c282",
    borderRadius: 8,
    padding: 8,
  },
})

export interface ListItemModel {
  name: string
  points: string
}

interface ListItemProps {
  item: ListItemModel
  isLast: boolean
}

const ListItem = ({ item, isLast }: ListItemProps) => {
  const bottomRadius = isLast ? 8 : 0
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomLeftRadius: bottomRadius,
          borderBottomRightRadius: bottomRadius,
        },
      ]}
    >
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>{item.points}</Text>
      </View>
    </View>
  )
}

export default ListItem
