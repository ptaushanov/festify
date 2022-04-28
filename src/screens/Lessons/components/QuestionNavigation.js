import React, { useState, useEffect } from "react";
import { useQuestionInfo } from "../../../contexts/QuestionContext";
import { useLessonsInfo } from "../../../contexts/LessonsContext";
import Navigation from "./Navigation";
import { useNavigation } from "@react-navigation/native";

const QuestionNavigation = () => {
    const navigation = useNavigation()
    const {
        currentStep,
        setCurrentStep,
        counter,
        setLessonFinished
    } = useLessonsInfo()

    const [actionButtonText, setActionButtonText] = useState("Check")

    const {
        currentChoice,
        questionState,
        resetQuestionState,
        checkAnswer
    } = useQuestionInfo();

    const setActionTextFromState = (state) => {
        switch (state) {
            case "correct":
                const nextStep = currentStep + 1
                if (nextStep < counter.stepsCount) {
                    setActionButtonText("Next")
                    break;
                }
                setActionButtonText("Finish")
                break;
            case "incorrect":
                setActionButtonText("Try again")
                break
            case "normal":
                setActionButtonText("Check")
                break;
            default:
        }
    }

    useEffect(() => {
        setActionTextFromState(questionState)
    }, [questionState])

    const handleBackButtonPressed = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
            return
        }

        navigation.goBack()
    }

    const goNext = () => {
        const nextStep = currentStep + 1
        if (nextStep < counter.stepsCount) {
            setCurrentStep(nextStep)
        }
        else { setLessonFinished(true) }
    }

    const handleActionButtonPressed = () => {
        switch (questionState) {
            case "correct":
                goNext()
                break
            case "incorrect":
                resetQuestionState()
                break
            case "normal":
                checkAnswer()
                break;
            default:
        }
    }

    const checkActionDisabled = () => {
        return currentChoice === -1 && questionState === "normal"
    }

    return (
        <Navigation
            onBackButtonPress={handleBackButtonPressed}
            onActionButtonPress={handleActionButtonPressed}
            actionButtonText={actionButtonText}
            actionButtonDisabled={checkActionDisabled()}
        />
    )
}

export default QuestionNavigation