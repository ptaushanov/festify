import { createContext, useState, useContext, useLayoutEffect } from "react"

const QuestionContext = createContext()

export function useQuestionInfo() {
    return useContext(QuestionContext)
}

export function QuestionProvider({ children, question }) {
    const [currentChoice, setCurrentChoice] = useState(-1)
    const [questionState, setQuestionState] = useState("normal")

    const resetQuestionState = () => {
        setCurrentChoice(-1)
        setQuestionState("normal")
    }

    useLayoutEffect(() => {
        resetQuestionState()
    }, [question])

    const checkAnswer = () => {
        const { answer } = question
        setQuestionState(currentChoice === answer ? "correct" : "incorrect")
    }

    const questionData = {
        question,
        currentChoice,
        setCurrentChoice,
        questionState,
        resetQuestionState,
        checkAnswer
    }

    return (
        <QuestionContext.Provider value={questionData}>
            {children}
        </QuestionContext.Provider>
    )
}