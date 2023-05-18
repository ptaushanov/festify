import { View, FlatList } from 'react-native'
import StyleSheet from "react-native-media-query"
import React, { useState, useCallback, useRef } from 'react'

import TimelineCard from './components/TimelineCard'
import TimelineTitle from './components/TimelineTitle'

import { useLessonsInfo } from '../../contexts/LessonsContext'
import { useFocusEffect } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native-paper'

import noImage from "../../assets/images/no_image.jpg"

const LessonsTimeline = ({ route }) => {
    const { forSeason, title } = route.params
    const [expandedIndex, setExpandedIndex] = useState(-1)
    const [cards, setCards] = useState([])
    const [jumpToLessonIndex, setJumpToLessonIndex] = useState(-1)

    const flatListRef = useRef(null)
    const {
        getTimelineDataBySeason,
        getUnlockedLessonsBySeason,
        getCurrentLesson,
        setCurrentSeason
    } = useLessonsInfo()

    const remapHolidays = async (holidays) => {
        const unlockedLessons =
            await getUnlockedLessonsBySeason(forSeason);

        return holidays.map((holiday, index) => ({
            title: holiday.name || "",
            date: holiday.celebrated_on || "",
            image: holiday.thumbnail ? { uri: holiday.thumbnail } : noImage,
            lessonRef: holiday.lessonRef,
            locked: !Boolean(unlockedLessons?.includes(index)),
            lessonIndex: index,
            onExpand: setExpandedIndex
        }))
    }

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const { holidays } = await getTimelineDataBySeason(forSeason)
                const holidaysWithMeta = await remapHolidays(holidays)
                setCards(holidaysWithMeta)
                setCurrentSeason(forSeason)

                const currentLesson = await getCurrentLesson()
                setJumpToLessonIndex(
                    forSeason === currentLesson.season ?
                        currentLesson.index : -1
                )
            })()
        }, [forSeason])
    )

    useFocusEffect(
        useCallback(() => {
            const scrollConditions =
                jumpToLessonIndex !== -1
                && flatListRef.current
                && cards.length > 0

            if (scrollConditions) {
                flatListRef.current
                    .scrollToIndex({ animated: true, index: jumpToLessonIndex });
                setExpandedIndex(jumpToLessonIndex)
            }
        }, [cards, flatListRef.current, jumpToLessonIndex])
    )

    const handleOnScrollToIndexFailed = async (info) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
    }

    return (
        <View style={styles.timelineWrapper} dataSet={{ media: ids.timelineWrapper }}>
            <FlatList
                style={styles.timeline}
                dataSet={{ media: ids.timeline }}
                data={cards}
                ref={flatListRef}
                onScrollToIndexFailed={handleOnScrollToIndexFailed}
                renderItem={({ item: props }) => (
                    <TimelineCard {...props} expanded={expandedIndex} />
                )}
                keyExtractor={card => card.lessonIndex}
                ListHeaderComponent={() => (
                    cards.length > 0 ?
                        <View>
                            <TimelineTitle title={`lessons:${title}`} />
                        </View> : null
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

const { styles, ids } = StyleSheet.create({
    timelineWrapper: {
        flex: 1,
        "@media only screen and (min-width: 640px)": {
            alignItems: "center"
        }
    },
    timelineContainer: {
        paddingBottom: 20,
        paddingHorizontal: 20
    },
    timeline: {
        flex: 1,
        "@media only screen and (min-width: 640px)": {
            flex: "auto",
            width: "max-content"
        }
    },
    indicator: {
        marginTop: "80%"
    }
})