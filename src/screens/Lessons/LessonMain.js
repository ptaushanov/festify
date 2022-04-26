import { StyleSheet, View } from 'react-native'
import React, { useState, useCallback } from 'react'

import { useLessonsInfo } from '../../contexts/LessonsContext'
import { useFocusEffect } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

import { ActivityIndicator } from 'react-native-paper'
import LessonContent from './components/LessonContent'
import ProgressIndicator from './components/ProgressIndicator'
import LessonNavigation from './components/LessonNavigation'

const LessonMain = () => {
    const {
        currentLessonRef,
        loadLessonData,
        unloadLessonData,
        lessonData,
        currentStep,
        counters
    } = useLessonsInfo()

    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            currentLessonRef && loadLessonData()
        }, [currentLessonRef])
    )

    const getCurrentPageContent = () => {
        return lessonData.content["page" + currentStep]
    }

    const handleBackButtonPressed = () => {
        unloadLessonData()
        navigation.goBack()
    }

    const handleActionButtonPressed = () => {

    }

    return (
        <View style={styles.flexContainer}>
            {lessonData ? (
                <View style={styles.flexContainer}>
                    <ProgressIndicator
                        steps={counters.stepsCount}
                        currentStep={currentStep}
                    />
                    <LessonContent
                        title={lessonData.holiday_name}
                        content={getCurrentPageContent()}
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