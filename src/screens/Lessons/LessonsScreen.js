import { StyleSheet, View, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
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

const LessonsScreen = () => {
    const navigation = useNavigation()
    const {
        unlockedSeasons,
        seasonsData,
    } = useLessonsInfo()

    const handleCardPress = (seasonName) => () => {
        const timelineName =
            seasonName.charAt(0).toUpperCase()
            + seasonName.substring(1)
            + " Timeline"
        navigation.navigate(timelineName)
    }

    return (
        <ScrollView style={globalStyles.slimContainer}>
            <LearningPath />
            <View style={styles.cardContainer}>
                <SeasonCard
                    title={i18n.t("lessons:Spring holidays")}
                    subtitle={(seasonsData.spring || 0) + " " + i18n.t("lessons:holidays")}
                    image={springImage}
                    onCardPress={handleCardPress("spring")}
                    locked={!unlockedSeasons.includes("spring")}
                />
            </View>
            <View style={styles.cardContainer}>
                <SeasonCard
                    title={i18n.t("lessons:Summer holidays")}
                    subtitle={(seasonsData.summer || 0) + " " + i18n.t("lessons:holidays")}
                    image={summerImage}
                    onCardPress={handleCardPress("summer")}
                    locked={!unlockedSeasons.includes("summer")}
                />
            </View>
            <View style={styles.cardContainer}>
                <SeasonCard
                    title={i18n.t("lessons:Autumn holidays")}
                    subtitle={(seasonsData.autumn || 0) + " " + i18n.t("lessons:holidays")}
                    image={autumnImage}
                    onCardPress={handleCardPress("autumn")}
                    locked={!unlockedSeasons.includes("autumn")}
                />
            </View>
            <View style={styles.cardContainer}>
                <SeasonCard
                    title={i18n.t("lessons:Winter holidays")}
                    subtitle={(seasonsData.winter || 0) + " " + i18n.t("lessons:holidays")}
                    image={winterImage}
                    onCardPress={handleCardPress("winter")}
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