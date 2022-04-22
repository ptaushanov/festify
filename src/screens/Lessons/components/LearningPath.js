import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'

import { Text } from "react-native-paper"
import i18n from 'i18n-js'

import { auth } from '../../../../firebase.v8'
import { getUnlockedSeasons, getSeasonByName } from '../../../services/lessons-services'

const LearningPath = () => {
    useEffect(() => {
        getUnlockedSeasons(auth.currentUser.uid)
            .then(seasonNames => {
                return Promise.all(seasonNames.map(name => getSeasonByName(name)))
            })
            .then(seasonStats => {
                console.log(seasonStats)
            })
            .catch(error => console.error(error))
    }, [])

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