import React, { useState } from "react";
import { useQuestionInfo } from "../../../contexts/QuestionContext";
import { useLessonsInfo } from "../../../contexts/LessonsContext";
import Navigation from "./Navigation";
import { useNavigation } from "@react-navigation/native";

const QuestionNavigation = () => {
    const { question } = useQuestionInfo();
    const { currentStep, setCurrentStep } = useLessonsInfo()
    const navigation = useNavigation()

    const handleBackButtonPressed = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
            return
        }

        navigation.goBack()
    }

    const handleActionButtonPressed = () => {

    }

    const checkActionButtonDisabled = () => {
        // return currentChoice === -1 && actionMode === "Check"
    }

    return (
        <Navigation
            onBackButtonPress={handleBackButtonPressed}
            onActionButtonPress={handleActionButtonPressed}
            actionButtonText={"Check"}
            actionButtonDisabled={false}
        />
    )
}

export default QuestionNavigation