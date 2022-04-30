import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import i18n from 'i18n-js'

const LeaderboardTitle = () => {
    return (
        <View>
            <Text style={styles.title}>
                {i18n.t("leaderboard:Current leaderboard")}
            </Text>
        </View>
    )
}

export default LeaderboardTitle

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: "bold",
    }
})