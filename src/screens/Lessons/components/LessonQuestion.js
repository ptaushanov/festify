import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'

import QuestionTitle from './QuestionTitle'
import AnswerCard from './AnswerCard'

import { useLessonsInfo } from '../../../contexts/LessonsContext'

const LessonQuestion = ({ content }) => {
    const {
        currentChoice,
        setCurrentChoice
    } = useLessonsInfo()

    return (
        <View style={styles.questionContainer}>
            <QuestionTitle title={content.title} />
            <View style={styles.answerContainer}>
                {content.choices.map((choice, index) => (
                    <AnswerCard
                        key={index}
                        text={choice}
                        state={currentChoice === index ? "selected" : "normal"}
                        selectIndex={index}
                        onSelect={setCurrentChoice}
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