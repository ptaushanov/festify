import React from 'react'

import LessonContent from './LessonContent'
import LessonQuestion from './LessonQuestion'

const AdaptableContent = ({ lesson, counters, currentStep }) => {
    const { pageCount, stepsCount } = counters

    const getCurrentPageContent = () => {
        return lesson.content["page" + currentStep]
    }

    const getQuestionContent = () => {
        const currentQuestion = currentStep - pageCount
        return lesson.questions[currentQuestion]
    }

    if (currentStep < pageCount) {
        return <LessonContent
            title={lesson.holiday_name}
            content={getCurrentPageContent()}
        />
    }
    else if (currentStep < stepsCount) {
        return <LessonQuestion
            content={getQuestionContent()}
        />
    }
    return null
}

export default AdaptableContent