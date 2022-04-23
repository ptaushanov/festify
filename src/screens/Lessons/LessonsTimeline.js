import { StyleSheet, View } from 'react-native'
import React from 'react'

import globalStyles from '../../styles/global'
import TimelineCard from './components/TimelineCard'

import placeholder from "../../assets/images/placeholder.jpg"

const LessonsTimeline = ({ route }) => {
    const { forSeason } = route.params

    return (
        <View style={globalStyles.container}>
            <TimelineCard
                title={"Holiday one"}
                date={"18th May"}
                image={placeholder}
                locked={false}
            />
            <TimelineCard
                title={"Holiday one"}
                date={"20th June"}
                image={placeholder}
                locked={false}
            />
            <TimelineCard
                title={"Holiday two"}
                date={"10th April"}
                image={placeholder}
                locked={false}
            />
            <TimelineCard
                title={"Holiday three"}
                date={"2th May"}
                image={placeholder}
                locked={false}
            />
            <TimelineCard
                title={"Holiday four"}
                date={"6th March"}
                image={placeholder}
                locked={false}
            />
        </View>
    )
}

export default LessonsTimeline

const styles = StyleSheet.create({

})