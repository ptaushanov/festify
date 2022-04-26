import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import QuestionTitle from './QuestionTitle'
import AnswerCard from './AnswerCard'

import { useLessonsInfo } from '../../../contexts/LessonsContext'

const LessonQuestion = ({ content }) => {
    const { setCurrentCorrectAnswer } = useLessonsInfo()

    useEffect(() => {
        setCurrentCorrectAnswer(content.answer)
    }, [content])

    return (
        <View style={styles.questionContainer}>
            <QuestionTitle title={content.title} />
            <View style={styles.answerContainer}>
                {content.choices.map((choice, index) => (
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