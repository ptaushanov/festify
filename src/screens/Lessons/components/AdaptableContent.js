import React, { Fragment } from 'react'

import LessonContent from './LessonContent'
import LessonQuestion from './LessonQuestion'
import { QuestionProvider } from '../../../contexts/QuestionContext'
import ContentNavigation from './ContentNavigation'
import QuestionNavigation from './QuestionNavigation'

const AdaptableContent = ({ lesson, counter, currentStep }) => {
    const { pageCount, stepsCount } = counter

    const getCurrentPageContent = () => {
        return lesson.content["page" + currentStep]
    }

    const getQuestionContent = () => {
        const currentQuestion = currentStep - pageCount
        return lesson.questions[currentQuestion]
    }

    if (currentStep < pageCount) {
        return (
            <Fragment>
                <LessonContent
                    title={lesson.holiday_name}
                    content={getCurrentPageContent()}
                />
                <ContentNavigation />
            </Fragment>
        )
    }
    else if (currentStep < stepsCount) {
        return (
            <QuestionProvider question={getQuestionContent()}>
                <LessonQuestion />
                <QuestionNavigation />
            </QuestionProvider>
        )
    }
    return null
}

export default AdaptableContent