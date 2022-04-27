import { StyleSheet, View } from 'react-native'
import React from 'react'

import QuestionTitle from './QuestionTitle'
import AnswerCard from './AnswerCard'
import { useQuestionInfo } from '../../../contexts/QuestionContext'

const LessonQuestion = () => {
    const { question } = useQuestionInfo()

    return (
        <View style={styles.questionContainer}>
            <QuestionTitle title={question.title} />
            <View style={styles.answerContainer}>
                {question.choices.map((choice, index) => (
                    <AnswerCard
                        key={index}
                        text={choice}
                        selectIndex={index}
                    />
                ))}
            </View>
        </View>
    )
}

export default LessonQuestion

const styles = StyleSheet.create({
    questionContainer: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: "space-between"
    },
    answerContainer: {
        marginBottom: 30
    }
})