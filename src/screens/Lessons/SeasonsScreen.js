import { View, ScrollView } from 'react-native'
import StyleSheet from "react-native-media-query"
import { useNavigation } from '@react-navigation/native'
import React from 'react'

import SeasonCard from './components/SeasonCard'
import LearningPath from './components/LearningPath'

import springImage from "../../assets/images/spring.jpg"
import summerImage from "../../assets/images/summer.jpg"
import autumnImage from "../../assets/images/autumn.jpg"
import winterImage from "../../assets/images/winter.jpg"

import i18n from 'i18n-js'
import { useLessonsInfo } from '../../contexts/LessonsContext'

const SeasonsScreen = () => {
    const navigation = useNavigation()
    const {
        seasonsData,
        unlockedSeasons
    } = useLessonsInfo()

    const handleCardPress = (seasonName) => () => {
        const timelineName = seasonName.capitalize() + " Timeline"

        const params = {
            forSeason: seasonName,
            title: seasonName.capitalize() + " holidays",
            appBarTitle: timelineName
        }
        navigation.navigate("Season Timeline", params)
    }

    return (
        <ScrollView
            style={styles.flexContainer}
            contentContainerStyle={styles.scrollContainer}
            dataSet={{ media: ids.scrollContainer }}
        >
            <LearningPath />
            <View style={styles.seasonsContainer} dataSet={{ media: ids.seasonsContainer }}>
                <View style={styles.cardContainer} dataSet={{ media: ids.cardContainer }}>
                    <SeasonCard
                        title={i18n.t("lessons:Spring holidays")}
                        subtitle={(seasonsData.spring || 0) + " " + i18n.t("lessons:holidays")}
                        image={springImage}
                        onCardPress={handleCardPress("spring")}
                        locked={!unlockedSeasons.includes("spring")}
                    />
                </View>
                <View style={styles.cardContainer} dataSet={{ media: ids.cardContainer }}>
                    <SeasonCard
                        title={i18n.t("lessons:Summer holidays")}
                        subtitle={(seasonsData.summer || 0) + " " + i18n.t("lessons:holidays")}
                        image={summerImage}
                        onCardPress={handleCardPress("summer")}
                        locked={!unlockedSeasons.includes("summer")}
                    />
                </View>
                <View style={styles.cardContainer} dataSet={{ media: ids.cardContainer }}>
                    <SeasonCard
                        title={i18n.t("lessons:Autumn holidays")}
                        subtitle={(seasonsData.autumn || 0) + " " + i18n.t("lessons:holidays")}
                        image={autumnImage}
                        onCardPress={handleCardPress("autumn")}
                        locked={!unlockedSeasons.includes("autumn")}
                    />
                </View>
                <View style={styles.cardContainer} dataSet={{ media: ids.cardContainer }}>
                    <SeasonCard
                        title={i18n.t("lessons:Winter holidays")}
                        subtitle={(seasonsData.winter || 0) + " " + i18n.t("lessons:holidays")}
                        image={winterImage}
                        onCardPress={handleCardPress("winter")}
                        locked={!unlockedSeasons.includes("winter")}
                    />
                </View>
            </View>
        </ScrollView >
    )
}

export default SeasonsScreen

const { styles, ids } = StyleSheet.create({
    cardContainer: {
        marginVertical: 14,
        "@media only screen and (min-width: 640px)": {
            flex: 1,
            aspectRatio: 1 / .8,
        }
    },
    flexContainer: {
        flex: 1
    },
    scrollContainer: {
        padding: 20,
        "@media only screen and (min-width: 640px)": {
            paddingHorizontal: 60
        }
    },
    seasonsContainer: {
        "@media only screen and (min-width: 640px)": {
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 25,
        }
    }
})