import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import React from 'react'
import { TouchableRipple } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';

const TimelineCardBody = ({
  title = "",
  date = "",
  expanded = -1,
  expandIndex,
  onExpand
}) => {
  const { colors } = useTheme();

  const handleExpandCard = () => {
    if (expanded === expandIndex) return;
    onExpand(expandIndex)
  }

  const handlePlayPressed = () => {

  }

  return (
    <TouchableWithoutFeedback onPress={handleExpandCard}>
      <View style={[
        styles.container,
        { backgroundColor: colors.surfaceCard }
      ]}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        {(expanded === expandIndex) && <View>
          <TouchableRipple
            onPress={handlePlayPressed}
            style={styles.playButton}
            borderless
            centered
          >
            <Ionicons
              name="play-circle-outline"
              size={25}
              color={colors.text}
            />
          </TouchableRipple>
        </View>}
      </View >
    </TouchableWithoutFeedback>
  )
}

export default TimelineCardBody

const styles = StyleSheet.create({
  container: {
    position: "relative",
    left: -35,
    borderRadius: 6,
    elevation: 2,
    paddingVertical: 8,
  },
  content: {
    paddingHorizontal: 30,
    paddingLeft: 55,
  },
  title: {
    fontSize: 18
  },
  date: {
    fontSize: 14,
    lineHeight: 20
  },
  playButton: {
    alignSelf: "flex-end",
    borderRadius: 100,
    paddingVertical: 1,
    paddingHorizontal: 2,
    marginHorizontal: 5,
  }
})