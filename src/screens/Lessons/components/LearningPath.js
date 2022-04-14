import { StyleSheet, View } from 'react-native'
import React from 'react'

import { Text } from "react-native-paper"
import i18n from 'i18n-js'

const LearningPath = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {i18n.t("lessons:Learning")}
            </Text>
            <Text style={styles.smallerText}>
                {i18n.t("lessons:Path")}
            </Text>
        </View>
    )
}

export default LearningPath

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 20
    },
    text: {
        fontSize: 34,
        fontWeight: "bold",
        paddingLeft: 5
    },
    smallerText: {
        fontWeight: "bold",
        fontSize: 32,
        paddingLeft: 5,
        lineHeight: 34
    }
})