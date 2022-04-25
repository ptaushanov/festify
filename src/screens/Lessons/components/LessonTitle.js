import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'

const LessonTitle = ({ title = "" }) => {
    return (
        <View>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default LessonTitle

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        paddingVertical: 10
    }
})