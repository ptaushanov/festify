import { StyleSheet, View } from 'react-native'
import React from 'react'

import TimelineCircle from './TimelineCircle'
import TimelineCardBody from './TimelineCardBody'

const TimelineCard = ({ title, date, image, locked = true }) => {
    return (
        <View style={styles.card}>
            <TimelineCircle size={70} image={image} locked={locked} />
            <TimelineCardBody title={title} date={date} />
        </View>
    )
}

export default TimelineCard

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
    }
})