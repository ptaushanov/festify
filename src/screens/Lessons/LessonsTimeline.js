import { StyleSheet, View, FlatList } from 'react-native'
import React, { useState } from 'react'

import TimelineCard from './components/TimelineCard'
import TimelineTitle from './components/TimelineTitle'
import TimelineStartPoint from './components/TimelineStartPoint'

import placeholder from "../../assets/images/placeholder.jpg"

const LessonsTimeline = ({ route }) => {
    const { forSeason, title } = route.params
    const [expandedIndex, setExpandedIndex] = useState(-1)

    const cards = [
        {
            title: "Holiday 1",
            date: "18th May",
            image: placeholder,
            locked: false,
            expanded: expandedIndex,
            expandIndex: 0,
            onExpand: setExpandedIndex
        }, {
            title: "Holiday 2",
            date: "6th May",
            image: placeholder,
            locked: false,
            expanded: expandedIndex,
            expandIndex: 1,
            onExpand: setExpandedIndex
        }, {
            title: "Holiday 3",
            date: "6th May",
            image: placeholder,
            locked: false,
            expanded: expandedIndex,
            expandIndex: 2,
            onExpand: setExpandedIndex
        }, {
            title: "Holiday 4",
            date: "6th May",
            image: placeholder,
            locked: true,
            expanded: expandedIndex,
            expandIndex: 3,
            onExpand: setExpandedIndex
        }, {
            title: "Holiday 5",
            date: "6th May",
            image: placeholder,
            locked: true,
            expanded: expandedIndex,
            expandIndex: 4,
            onExpand: setExpandedIndex
        }, {
            title: "Holiday 6",
            date: "6th May",
            image: placeholder,
            locked: true,
            expanded: expandedIndex,
            expandIndex: 5,
            onExpand: setExpandedIndex
        }, {
            title: "Holiday 7",
            date: "6th May",
            image: placeholder,
            locked: true,
            expanded: expandedIndex,
            expandIndex: 6,
            onExpand: setExpandedIndex
        }
    ]

    return (
        <View style={styles.timelineWrapper}>
            <FlatList
                style={styles.timeline}
                data={cards}
                renderItem={({ item: props }) => (<TimelineCard  {...props} />)}
                keyExtractor={card => card.expandIndex}
                ListHeaderComponent={() => (
                    <View>
                        <TimelineTitle title={`lessons:${title}`} />
                        <TimelineStartPoint />
                    </View>
                )}
                contentContainerStyle={styles.timelineContainer}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default LessonsTimeline

const styles = StyleSheet.create({
    timelineWrapper: {
        flex: 1,
        paddingHorizontal: 20,
    },
    timelineContainer: {
        paddingBottom: 20
    },
    timeline: {
        flex: 1,
    }
})