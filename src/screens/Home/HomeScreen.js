import { View } from 'react-native'
import React, { useCallback, useState } from 'react'
import globalStyles from '../../styles/global'
import LessonCard from './components/LessonCard'
import placeholder from "../../assets/images/placeholder.jpg"
import { useFocusEffect } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const [currentLesson, setCurrentLesson] = useState(null)
    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {

        }, [])
    )

    const handleContinuePress = () => {
        const seasonName = "spring"
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

    return (
        <View style={globalStyles.slimContainer}>
            <LessonCard
                lessonThumbnail={placeholder}
                onContinuePress={handleContinuePress}
            />
        </View>
    )
}

export default HomeScreen