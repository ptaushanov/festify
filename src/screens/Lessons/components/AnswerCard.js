import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Surface, Text, TouchableRipple } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from 'react-native-paper'
import { useLessonsInfo } from '../../../contexts/LessonsContext';

const AnswerCard = ({
    text = "",
    selectIndex,
}) => {
    const { colors } = useTheme()
    const themedStyle = { backgroundColor: colors.surfaceCard }
    const [cardState, setCardState] = useState("normal")

    const {
        currentChoice,
        setCurrentChoice,
        currentChoiceState,
    } = useLessonsInfo()

    useEffect(() => {
        setCardState(currentChoice === selectIndex ? "selected" : "normal")
    }, [currentChoice])

    useEffect(() => {
        setCardState(currentChoice === selectIndex ? currentChoiceState : "normal")
    }, [currentChoiceState])

    switch (cardState) {
        case "correct":
        case "selected":
        case "incorrect":
            themedStyle.borderWidth = 2
            break
        default:
            themedStyle.borderWidth = 0
    }

    switch (cardState) {
        case "correct":
            themedStyle.borderColor = colors.success
            break
        case "selected":
            themedStyle.borderColor = colors.primary
            break
        case "incorrect":
            themedStyle.borderColor = colors.danger
            break
        default:
            themedStyle.borderColor = "transparent"
    }

    const handleChoiceSelect = () => {
        switch (currentChoiceState) {
            case "correct":
            case "incorrect":
                return
        }
        setCurrentChoice(selectIndex)
    }

    return (
        <Surface style={[
            styles.cardSurface,
            themedStyle
        ]}>
            <TouchableRipple
                onPress={handleChoiceSelect}
                borderless
                centered
                style={styles.ripple}
            >
                <View style={styles.cardContent}>
                    <Text style={styles.text}>
                        {text}
                    </Text>

                    {cardState === "correct" ?
                        <Ionicons name="checkmark" size={24} color={colors.success} /> :
                        cardState === "incorrect" ?
                            <Ionicons name="close" size={24} color={colors.danger} /> : null
                    }
                </View>
            </TouchableRipple>
        </Surface>
    )
}

export default AnswerCard

const styles = StyleSheet.create({
    cardSurface: {
        elevation: 2,
        borderRadius: 6,
        marginVertical: 6,
    },
    ripple: {
        borderRadius: 6
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center"
    },
    text: {
        fontSize: 18,
        paddingHorizontal: 15,
        paddingVertical: 12
    }
})