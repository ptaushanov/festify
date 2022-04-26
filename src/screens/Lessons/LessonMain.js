import { StyleSheet, View } from 'react-native'
import React, { useState, useCallback } from 'react'

import { useLessonsInfo } from '../../contexts/LessonsContext'
import { useFocusEffect } from '@react-navigation/native'

import { ActivityIndicator } from 'react-native-paper'
import LessonContent from './components/LessonContent'
import ProgressIndicator from './components/ProgressIndicator'
import LessonNavigation from './components/LessonNavigation'

const LessonMain = () => {
    const {
        getLesson,
        currentLessonRef,
    } = useLessonsInfo()

    const [lesson, setLesson] = useState(null)
    const currentStep = 0

    const getLessonOnFocus = async () => {
        const _lesson = await getLesson(currentLessonRef)
        setLesson(_lesson)
    }

    useFocusEffect(
        useCallback(() => {
            currentLessonRef && getLessonOnFocus()
        }, [currentLessonRef])
    )

    const determineStepCount = () => {
        const { content, questions } = lesson
        const pageCount = content ? Object.keys(content).length : 0
        const questionCount = questions ? questions.length : 0

        return pageCount + questionCount
    }

    const getCurrentPageContent = () => {
        return lesson.content["page" + currentStep]
    }

    const handleActionButtonPressed = () => {

    }

    return (
        <View style={styles.flexContainer}>
            {lesson ? (
                <View style={styles.flexContainer}>
                    <ProgressIndicator
                        steps={determineStepCount()}
                        currentStep={currentStep}
                    />
                    <LessonContent
                        title={lesson.holiday_name}
                        content={getCurrentPageContent()}
                    />
                    <LessonNavigation
                        actionButtonText="Next"
                        onActionButtonPress={handleActionButtonPressed}
                    />
                </View>
            ) :
                <ActivityIndicator
                    size="large"
                    style={styles.indicator}
                />}
        </View>
    )
}

export default LessonMain

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    indicator: {
        alignSelf: "center",
        flex: 1
    }
})