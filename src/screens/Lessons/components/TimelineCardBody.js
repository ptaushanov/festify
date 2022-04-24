import { StyleSheet, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import React from 'react'
import { TouchableRipple, Surface } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

const TimelineCardBody = ({
  title = "",
  date = "",
  expanded = -1,
  expandIndex,
  onExpand,
  lessonRef
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleExpandCard = () => {
    if (expanded === expandIndex) {
      handlePlayPressed()
      return;
    }

    onExpand(expandIndex)
  }

  const handlePlayPressed = () => {
    // lessonRef?.get().then(doc => alert(doc.exists))
    navigation.navigate("Lesson Main")
  }

  return (
    <Surface style={styles.container}>
      <TouchableRipple
        onPress={handleExpandCard}
        style={styles.cardRipple}
        borderless
        centered
      >
        <View style={styles.contentWrapper}>
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
        </View>
      </TouchableRipple>
    </Surface >
  )
}

export default TimelineCardBody

const styles = StyleSheet.create({
  container: {
    position: "relative",
    left: -25,
    borderRadius: 6,
    elevation: 2,
  },
  cardRipple: {
    borderRadius: 6
  },
  contentWrapper: {
    paddingVertical: 8,
  },
  content: {
    paddingHorizontal: 30,
    paddingLeft: 45,
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