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

const LessonsScreen = () => {

    const handleCardPress = (identifier) => () => { }

    return (
        <ScrollView style={globalStyles.slimContainer}>
            <LearningPath />
            <View style={styles.cardContainer}>
                <SeasonCard
                    title={i18n.t("lessons:Spring holidays")}
                    subtitle={"12 " + i18n.t("lessons:holidays")}
                    image={springImage}
                    onCardPress={handleCardPress(0)}
                    locked={false}
                />
            </View>
            <View style={styles.cardContainer}>
                <SeasonCard
                    title={i18n.t("lessons:Summer holidays")}
                    subtitle={"8 " + i18n.t("lessons:holidays")}
                    image={summerImage}
                    onCardPress={handleCardPress(1)}
                />
            </View>
            <View style={styles.cardContainer}>
                <SeasonCard
                    title={i18n.t("lessons:Autumn holidays")}
                    subtitle={"18 " + i18n.t("lessons:holidays")}
                    image={autumnImage}
                    onCardPress={handleCardPress(2)}
                />
            </View>
            <View style={styles.cardContainer}>
                <SeasonCard
                    title={i18n.t("lessons:Winter holidays")}
                    subtitle={"11 " + i18n.t("lessons:holidays")}
                    image={winterImage}
                    onCardPress={handleCardPress(3)}
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