import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import i18n from 'i18n-js'

const TimelineTitle = ({ title }) => {
    return (
        <View>
            <Text style={styles.title}>{i18n.t(title)}</Text>
        </View>
    )
}

export default TimelineTitle

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: "bold",
        paddingTop: 25,
        paddingBottom: 15,
        paddingLeft: 27,
    }
})