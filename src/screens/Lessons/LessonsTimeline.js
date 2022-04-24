import { StyleSheet, View, FlatList } from 'react-native'
import React, { useState, useCallback } from 'react'

import TimelineCard from './components/TimelineCard'
import TimelineTitle from './components/TimelineTitle'
import TimelineStartPoint from './components/TimelineStartPoint'

import { useLessonsInfo } from '../../contexts/LessonsContext'
import { useFocusEffect } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native-paper'

import noImage from "../../assets/images/no_image.jpg"

const LessonsTimeline = ({ route }) => {
    const { forSeason, title } = route.params
    const [expandedIndex, setExpandedIndex] = useState(-1)

    const { getTimelineDataBySeason } = useLessonsInfo()
    const [cards, setCards] = useState([])

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const { holidays } = await getTimelineDataBySeason(forSeason)
                const holidaysWithMeta = holidays.map((holiday, index) => ({
                    title: holiday.name || "",
                    date: holiday.celebrated_on || "",
                    image: holiday.thumbnail ? { uri: holiday.thumbnail } : noImage,
                    locked: false,
                    expandIndex: index,
                    onExpand: setExpandedIndex
                }))
                setCards(holidaysWithMeta)
            })()
        }, [forSeason])
    )

    return (
        <View style={styles.timelineWrapper}>
            <FlatList
                style={styles.timeline}
                data={cards}
                renderItem={({ item: props }) => (
                    <TimelineCard expanded={expandedIndex}  {...props} />
                )}
                keyExtractor={card => card.expandIndex}
                ListHeaderComponent={() => (
                    <View>
                        <TimelineTitle title={`lessons:${title}`} />
                        {cards.length > 0 && <TimelineStartPoint />}
                    </View>
                )}
                ListEmptyComponent={() => (
                    <ActivityIndicator size="large" style={styles.indicator} />
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
        paddingBottom: 20,
    },
    timeline: {
        flex: 1,
    },
    indicator: {
        marginTop: "60%"
    }
})