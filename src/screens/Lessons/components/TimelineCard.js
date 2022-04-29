import { StyleSheet, View } from 'react-native'
import React from 'react'

import TimelineCircle from './TimelineCircle'
import TimelineCardBody from './TimelineCardBody'

import { useTheme } from 'react-native-paper'

const TimelineCard = ({
    title,
    date,
    image,
    locked = true,
    expanded = -1,
    lessonIndex,
    onExpand,
    lessonRef
}) => {
    const { colors } = useTheme()

    return (
        <View style={styles.card}>
            <View style={[styles.timeline, { borderColor: colors.primary }]} />
            <TimelineCircle size={60} image={image} locked={locked} />
            {!locked &&
                <TimelineCardBody
                    title={title}
                    date={date}
                    expanded={expanded}
                    lessonIndex={lessonIndex}
                    onExpand={onExpand}
                    lessonRef={lessonRef}
                />
            }
        </View>
    )
}

export default TimelineCard

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
    },
    timeline: {
        position: "absolute",
        width: 0,
        borderLeftWidth: 3,
        left: 34,
        bottom: 0,
        top: 0
    }
})