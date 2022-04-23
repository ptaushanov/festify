import { StyleSheet, View, ScrollView } from 'react-native'
import React, { useState } from 'react'

import TimelineCard from './components/TimelineCard'

import placeholder from "../../assets/images/placeholder.jpg"

const LessonsTimeline = ({ route }) => {
    const { forSeason } = route.params
    const [expandedIndex, setExpandedIndex] = useState(2)

    return (
        <View style={styles.timelineContainer}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <TimelineCard
                    title={"Holiday one"}
                    date={"18th May"}
                    image={placeholder}
                    locked={false}
                    expanded={expandedIndex}
                    expandIndex={0}
                    onExpand={setExpandedIndex}
                />
                <TimelineCard
                    title={"Holiday one"}
                    date={"20th June"}
                    image={placeholder}
                    locked={false}
                    expanded={expandedIndex}
                    expandIndex={1}
                    onExpand={setExpandedIndex}
                />
                <TimelineCard
                    title={"Holiday two"}
                    date={"10th April"}
                    image={placeholder}
                    locked={false}
                    expanded={expandedIndex}
                    expandIndex={2}
                    onExpand={setExpandedIndex}
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
                <TimelineCard
                    title={"Holiday four"}
                    date={"6th March"}
                    image={placeholder}
                    locked={false}
                />
                <TimelineCard
                    title={"Holiday four"}
                    date={"6th March"}
                    image={placeholder}
                />
            </ScrollView>
        </View>
    )
}

export default LessonsTimeline

const styles = StyleSheet.create({
    timelineContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10
    }
})