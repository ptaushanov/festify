import { StyleSheet, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import React from 'react'

const TimelineCardBody = ({ title = "", date = "" }) => {
  const { colors } = useTheme();

  return (
    <View style={[
      styles.container,
      { backgroundColor: colors.surfaceCard }
    ]}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  )
}

export default TimelineCardBody

const styles = StyleSheet.create({
  container: {
    position: "relative",
    left: -20,

    paddingHorizontal: 30,
    paddingVertical: 10,
    paddingLeft: 50,
    borderRadius: 6,

    elevation: 2
  },
  title: {
    fontSize: 18
  },
  date: {
    fontSize: 14,
    lineHeight: 20
  }
})