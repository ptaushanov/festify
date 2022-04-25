import { StyleSheet, View } from 'react-native'
import React from 'react'

import LessonTitle from './LessonTitle'

const LessonContent = ({ content }) => {
    const { holiday_name: holidayName } = content

    return (
        <View style={styles.contentContainer}>
            <LessonTitle title={holidayName} />
            {/* TODO: add visualizer for content */}
        </View>
    )
}

export default LessonContent

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 10
    }
})