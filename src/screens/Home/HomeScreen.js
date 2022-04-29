import { View } from 'react-native'
import React, { useCallback, useState } from 'react'
import globalStyles from '../../styles/global'
import LessonCard from './components/LessonCard'
import { useFocusEffect } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

import { findCurrentLesson } from '../../services/home-services'
import noImage from "../../assets/images/no_image.jpg"
import { auth } from '../../../firebase.v8'

const HomeScreen = () => {
    const [currentLesson, setCurrentLesson] = useState(null)
    const navigation = useNavigation()

    const getCurrentLesson = async () => {
        const _currentLesson = await findCurrentLesson(auth.currentUser.uid)
        setCurrentLesson(_currentLesson)
    }

    useFocusEffect(
        useCallback(() => {
            getCurrentLesson()
        }, [auth.currentUser])
    )

    const handleContinuePress = () => {
        const seasonName = currentLesson.season
        const timelineName = seasonName.capitalize() + " Timeline"

        const params = {
            forSeason: seasonName,
            title: seasonName.capitalize() + " holidays",
            appBarTitle: timelineName,
            jumpToLessonIndex: currentLesson.index
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
        <View style={globalStyles.paddedContainer}>
            {currentLesson && <LessonCard
                lessonTitle={currentLesson.name}
                lessonThumbnail={getLessonThumbnail()}
                onContinuePress={handleContinuePress}
            />}
        </View>
    )
}

export default HomeScreen