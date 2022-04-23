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
    expandIndex,
    onExpand
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
                    expandIndex={expandIndex}
                    onExpand={onExpand}
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
        paddingTop: 30,
    },
    timeline: {
        position: "absolute",
        width: 0,
        borderLeftWidth: 2,
        left: 36,
        bottom: 0,
        top: 0
    }
})