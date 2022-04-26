import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'

import Button from '../../../shared/Button/Button'
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';

import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import { useLessonsInfo } from '../../../contexts/LessonsContext';
import i18n from 'i18n-js';

const LessonNavigation = () => {
    const { colors } = useTheme()
    const navigation = useNavigation()
    const [actionMode, setActionMode] = useState("Next")

    const {
        unloadLessonData,
        setCurrentStep,
        currentStep,
        counters,
        currentChoice,
        setCurrentChoice
    } = useLessonsInfo()

    const { pageCount, stepsCount } = counters

    useEffect(() => {
        if (currentStep < pageCount) {
            setActionMode("Next")
        }
        else if (currentStep < stepsCount) {
            setActionMode("Check")
        }
    }, [currentStep])

    const handleBackButtonPressed = () => {
        if (currentStep > 0) {
            setCurrentChoice(-1)
            setCurrentStep(currentStep - 1)
            return
        }

        unloadLessonData()
        navigation.goBack()
    }

    const handleActionButtonPressed = () => {
        switch (actionMode) {
            case "Check":
                // TODO: ???
                return
            case "Try again":
                // TODO: ???
                return
        }

        const nextStep = currentStep + 1
        if (nextStep < counters.stepsCount) {
            setCurrentStep(nextStep)
        }
        else {
            // TODO: Finish lesson
        }
    }

    const checkActionButtonDisabled = () => {
        return currentChoice === -1 && actionMode === "Check"
    }

    const themedStyles = {
        borderTopColor: colors.divider,
        backgroundColor: colors.surface
    }

    return (
        <View style={[
            styles.navigationContainer,
            themedStyles
        ]}>
            <IconButton
                icon={(props) => (
                    <Ionicons
                        name="caret-back-circle"
                        {...props}
                        color={colors.accent}
                    />
                )}
                size={35}
                style={styles.backButton}
                onPress={handleBackButtonPressed}
            />
            <Button
                mode="contained"
                size={2}
                style={styles.actionButton}
                onPress={handleActionButtonPressed}
                disabled={checkActionButtonDisabled()}
            >
                {i18n.t("lessons:" + actionMode)}
            </Button>
        </View>
    )
}

export default LessonNavigation

const styles = StyleSheet.create({
    navigationContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth: 1,
        paddingVertical: 2
    },
    backButton: {
        margin: 0,
        marginLeft: 20
    },
    actionButton: {
        alignSelf: "flex-end",
        marginRight: 20
    },

})