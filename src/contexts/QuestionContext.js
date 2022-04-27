import { createContext, useState, useContext } from "react"

const QuestionContext = createContext()

export function useQuestionInfo() {
    return useContext(QuestionContext)
}

export function QuestionProvider({ children, question }) {
    // const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState(-2)
    // const [currentChoice, setCurrentChoice] = useState(-1)
    // const [currentChoiceState, setCurrentChoiceState] = useState("normal")

    const questionData = {
        question
    }

    return (
        <QuestionContext.Provider value={questionData}>
            {children}
        </QuestionContext.Provider>
    )
}