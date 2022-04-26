import { StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'

import { useLessonsInfo } from '../../contexts/LessonsContext'
import { useFocusEffect } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

import { ActivityIndicator } from 'react-native-paper'
import ProgressIndicator from './components/ProgressIndicator'
import LessonNavigation from './components/LessonNavigation'
import AdaptableContent from './components/AdaptableContent'

const LessonMain = () => {
    const {
        currentLessonRef,
        loadLessonData,
        unloadLessonData,
        lessonData,
        currentStep,
        setCurrentStep,
        counters
    } = useLessonsInfo()

    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            currentLessonRef && loadLessonData()
        }, [currentLessonRef])
    )

    const handleBackButtonPressed = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
            return
        }

        unloadLessonData()
        navigation.goBack()
    }

    const handleActionButtonPressed = () => {
        const nextStep = currentStep + 1
        if (nextStep < counters.stepsCount) {
            setCurrentStep(nextStep)
        }
        else {
            // TODO: Finish lesson
        }
    }

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
                    <LessonNavigation
                        actionButtonText="Next"
                        onBackButtonPress={handleBackButtonPressed}
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