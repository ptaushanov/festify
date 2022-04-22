import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import globalStyles from '../../styles/global'

import SeasonCard from './components/SeasonCard'
import LearningPath from './components/LearningPath'

import springImage from "../../assets/images/spring.jpg"
import summerImage from "../../assets/images/summer.jpg"
import autumnImage from "../../assets/images/autumn.jpg"
import winterImage from "../../assets/images/winter.jpg"

import i18n from 'i18n-js'
import { useLessonsInfo } from '../../contexts/LessonsContext'

import { useFocusEffect } from '@react-navigation/native'

const LessonsScreen = () => {
    const {
        unlockedSeasons,
        seasonsData,
        startUpdates,
        stopUpdates
    } = useLessonsInfo()

    const handleCardPress = (identifier) => () => { }

    useFocusEffect(
        React.useCallback(() => {
            startUpdates()
            return () => {
                alert("dd")
                stopUpdates()
            }
        }, [])
    );

    return (
        <ScrollView style={globalStyles.slimContainer}>
            <LearningPath />
            <View style={styles.cardContainer}>
                <SeasonCard
                    title={i18n.t("lessons:Spring holidays")}
                    subtitle={(seasonsData.spring || 0) + " " + i18n.t("lessons:holidays")}
                    image={springImage}
                    onCardPress={handleCardPress(0)}
                    locked={!unlockedSeasons.includes("spring")}
                />
            </View>
            <View style={styles.cardContainer}>
                <SeasonCard
                    title={i18n.t("lessons:Summer holidays")}
                    subtitle={(seasonsData.summer || 0) + " " + i18n.t("lessons:holidays")}
                    image={summerImage}
                    onCardPress={handleCardPress(1)}
                    locked={!unlockedSeasons.includes("summer")}
                />
            </View>
            <View style={styles.cardContainer}>
                <SeasonCard
                    title={i18n.t("lessons:Autumn holidays")}
                    subtitle={(seasonsData.autumn || 0) + " " + i18n.t("lessons:holidays")}
                    image={autumnImage}
                    onCardPress={handleCardPress(2)}
                    locked={!unlockedSeasons.includes("autumn")}
                />
            </View>
            <View style={styles.cardContainer}>
                <SeasonCard
                    title={i18n.t("lessons:Winter holidays")}
                    subtitle={(seasonsData.winter || 0) + " " + i18n.t("lessons:holidays")}
                    image={winterImage}
                    onCardPress={handleCardPress(3)}
                    locked={!unlockedSeasons.includes("winter")}
                />
            </View>
        </ScrollView >
    )
}

export default LessonsScreen

const styles = StyleSheet.create({
    cardContainer: {
        marginVertical: 14
    }
})