import React, { useState } from "react";
import { useLessonsInfo } from "../../../contexts/LessonsContext";
import { useNavigation } from "@react-navigation/native";
import Navigation from "./Navigation";

const ContentNavigation = () => {
    const navigation = useNavigation()

    const {
        currentStep,
        setCurrentStep,
        counter
    } = useLessonsInfo()

    const handleBackButtonPressed = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
            return
        }

        navigation.goBack()
    }

    const handleActionButtonPressed = () => {
        const nextStep = currentStep + 1
        if (nextStep < counter.stepsCount) {
            setCurrentStep(nextStep)
        }
    }

    return (
        <Navigation
            onBackButtonPress={handleBackButtonPressed}
            onActionButtonPress={handleActionButtonPressed}
            actionButtonText="Next"
            actionButtonDisabled={false}
        />
    )
}

export default ContentNavigation