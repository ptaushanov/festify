import { StyleSheet, View } from 'react-native'
import React from 'react'

import TimelineCircle from './TimelineCircle'
import TimelineCardBody from './TimelineCardBody'

const TimelineCard = ({
    title,
    date,
    image,
    locked = true,
    expanded = -1,
    expandIndex,
    onExpand
}) => {
    return (
        <View style={styles.card}>
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
        paddingVertical: 20,
    }
})