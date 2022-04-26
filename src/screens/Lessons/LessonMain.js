import { StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'

import { useLessonsInfo } from '../../contexts/LessonsContext'
import { useFocusEffect } from '@react-navigation/native'

import { ActivityIndicator } from 'react-native-paper'
import ProgressIndicator from './components/ProgressIndicator'
import LessonNavigation from './components/LessonNavigation'
import AdaptableContent from './components/AdaptableContent'

const LessonMain = () => {
    const {
        currentLessonRef,
        loadLessonData,
        lessonData,
        currentStep,
        counters,
    } = useLessonsInfo()

    useFocusEffect(
        useCallback(() => {
            currentLessonRef && loadLessonData()
        }, [currentLessonRef])
    )

    return (
        <View style={styles.flexContainer}>
            {lessonData ? (
                <View style={styles.flexContainer}>
                    <ProgressIndicator
                        steps={counters.stepsCount}
                        currentStep={currentStep}
                    />
                    <AdaptableContent
                        lesson={lessonData}
                        counters={counters}
                        currentStep={currentStep}
                    />
                    <LessonNavigation />
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