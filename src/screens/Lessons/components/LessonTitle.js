import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'

const LessonTitle = ({ title = "" }) => {
    return (
        <Text style={styles.title}>
            {title}
        </Text>
    )
}

export default LessonTitle

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        paddingVertical: 10,
        paddingLeft: 10,
    }
})