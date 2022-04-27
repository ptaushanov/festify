import { StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'

import { useLessonsInfo } from '../../contexts/LessonsContext'
import { useFocusEffect } from '@react-navigation/native'

import { ActivityIndicator } from 'react-native-paper'
import ProgressIndicator from './components/ProgressIndicator'
import AdaptableContent from './components/AdaptableContent'

const LessonScreen = () => {
    const {
        currentLessonRef,
        loadLessonData,
        unloadLessonData,
        lessonData,
        currentStep,
        counter,
    } = useLessonsInfo()

    useFocusEffect(
        useCallback(() => {
            currentLessonRef && loadLessonData()
            return unloadLessonData
        }, [currentLessonRef])
    )

    return (
        <View style={styles.flexContainer}>
            {lessonData ? (
                <View style={styles.flexContainer}>
                    <ProgressIndicator
                        steps={counter.stepsCount}
                        currentStep={currentStep}
                    />
                    <AdaptableContent
                        lesson={lessonData}
                        counter={counter}
                        currentStep={currentStep}
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

export default LessonScreen

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    indicator: {
        alignSelf: "center",
        flex: 1
    }
})