import { View } from 'react-native'
import StyleSheet from "react-native-media-query"
import React from 'react'

import QuestionTitle from './QuestionTitle'
import AnswerCard from './AnswerCard'
import { useQuestionInfo } from '../../../contexts/QuestionContext'

const LessonQuestion = () => {
    const { question } = useQuestionInfo()

    return (
        <View style={styles.questionContainer} dataSet={{ media: ids.questionContainer }}>
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

const { styles, ids } = StyleSheet.create({
    questionContainer: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: "space-between",
        "@media only screen and (min-width: 640px)": {
            paddingHorizontal: "10%"
        }
    },
    answerContainer: {
        marginBottom: 30
    }
})