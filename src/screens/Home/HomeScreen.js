import { View } from 'react-native'
import StyleSheet from "react-native-media-query"
import React, { useCallback, useState } from 'react'
import LessonCard from './components/LessonCard'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native-paper'
import noImage from "../../assets/images/no_image.jpg"
import { auth } from '../../../firebase.v9'

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
            setTimeout(() => {
                setDailyReward(false)
            }, 2000)
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
        <View style={styles.container} dataSet={{ media: ids.container }}>
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

const { styles, ids } = StyleSheet.create({
    container: {
        padding: 40,
        flex: 1,
        "@media only screen and (min-width: 640px)": {
            width: "50%",
            alignSelf: "center",
        }
    },
    activityIndicator: {
        flex: 1
    }
})

export default HomeScreen