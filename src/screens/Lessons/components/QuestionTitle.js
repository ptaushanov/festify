import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'

const QuestionTitle = ({ title = "" }) => {
    return (
        <Text style={styles.title}>{title}</Text>
    )
}

export default QuestionTitle

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 26,
        paddingVertical: 20
    }
})