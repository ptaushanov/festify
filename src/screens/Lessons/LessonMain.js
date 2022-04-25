import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useCallback } from 'react'
import globalStyles from '../../styles/global'

import { useLessonsInfo } from '../../contexts/LessonsContext'
import { useFocusEffect } from '@react-navigation/native'

const LessonMain = ({ route }) => {
    const { lessonRef } = route.params
    const { getLesson } = useLessonsInfo()
    const [lesson, setLesson] = useState(null)

    const getLessonOnFocus = async () => {
        const _lesson = await getLesson(lessonRef)
        console.log(_lesson)
        setLesson(lesson)
    }

    useFocusEffect(
        useCallback(() => {
            getLessonOnFocus()
        }, [lessonRef])
    )

    return (
        <View style={globalStyles.container}>
            <Text>LessonMain</Text>
        </View>
    )
}

export default LessonMain

const styles = StyleSheet.create({})