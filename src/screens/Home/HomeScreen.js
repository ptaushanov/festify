import { View, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import LessonCard from './components/LessonCard'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native-paper'
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
            {currentLesson ? <LessonCard
                lessonTitle={currentLesson.name}
                lessonThumbnail={getLessonThumbnail()}
                onContinuePress={handleContinuePress}
            /> :
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