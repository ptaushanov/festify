import { View, StyleSheet } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import LessonCard from './components/LessonCard'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native-paper'
import noImage from "../../assets/images/no_image.jpg"
import { auth } from '../../../firebase.v8'

import {
    findCurrentLesson,
    claimReward as claimRewardService,
    checkDailyReward
} from '../../services/home-services'
import DailyRewardCard from './components/DailyRewardCard'

const HomeScreen = () => {
    const [currentLesson, setCurrentLesson] = useState(null)
    const [dailyReward, setDailyReward] = useState(false)
    const [rewardAmount, setRewardAmount] = useState(0)
    const navigation = useNavigation()

    useEffect(() => {
        setDailyReward(false)
    }, [rewardAmount])

    const getCurrentLesson = async () => {
        try {
            const _currentLesson = await findCurrentLesson(auth.currentUser.uid)
            setCurrentLesson(_currentLesson)
        } catch (error) {
            console.error(error)
        }
    }

    const getDailyReward = async () => {
        setRewardAmount(0)
        try {
            const hasReward = await checkDailyReward(auth.currentUser.uid)
            hasReward && setDailyReward(true)
        } catch (error) {
            console.error(error)
        }
    }

    const claimReward = async () => {
        try {
            const gainedXP = 10 + Math.round(Math.random() * 9) * 10
            claimRewardService(auth.currentUser.uid, gainedXP)
            setRewardAmount(gainedXP)
        } catch (error) {
            console.error(error)
        }
    }

    const runSequential = async () => {
        await getCurrentLesson()
        await getDailyReward()
    }

    useFocusEffect(
        useCallback(() => {
            runSequential()
        }, [auth.currentUser])
    )

    const handleContinuePress = () => {
        const seasonName = currentLesson.season
        const timelineName = seasonName.capitalize() + " Timeline"

        const params = {
            forSeason: seasonName,
            title: seasonName.capitalize() + " holidays",
            appBarTitle: timelineName
        }
        navigation.navigate("LessonsStack", {
            screen: "Season Timeline",
            initial: false,
            params
        })
    }

    const getLessonThumbnail = () => {
        return currentLesson.thumbnail ?
            { uri: currentLesson.thumbnail } : noImage
    }

    return (
        <View style={styles.container}>
            {currentLesson ?
                <View>
                    <LessonCard
                        lessonTitle={currentLesson.name}
                        lessonThumbnail={getLessonThumbnail()}
                        onContinuePress={handleContinuePress}
                    />
                    {dailyReward &&
                        <DailyRewardCard
                            onRewardClaim={claimReward}
                            rewardAmount={rewardAmount}
                        />
                    }
                </View> :
                <ActivityIndicator
                    style={styles.activityIndicator}
                    size="large"
                />
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 40,
        flex: 1
    },
    activityIndicator: {
        flex: 1
    }
})

export default HomeScreen