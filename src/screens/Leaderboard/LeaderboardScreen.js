import { StyleSheet, View } from 'react-native'
import React, { useState, useCallback } from 'react'
import globalStyles from '../../styles/global'
import LeaderboardTitle from './components/LeaderboardTitle'
import LeaderboardCard from './components/LeaderboardCard'

import { useFocusEffect } from '@react-navigation/native'
import { auth } from '../../../firebase.v8'
import {
    findUser,
    findUserPlace
} from '../../services/leaderboard-services'

import i18n from 'i18n-js'

const LeaderboardScreen = () => {
    const [currentUser, setCurrentUser] = useState(null)

    const getCurrentUser = async () => {
        try {
            let _currentUser = await findUser(auth.currentUser.uid)
            _currentUser.place = await findUserPlace(_currentUser.xp)
            setCurrentUser(_currentUser)
        } catch (error) {
            console.error(error)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getCurrentUser()
        }, [])
    )

    return (
        <View style={globalStyles.slimContainer}>
            <LeaderboardTitle />
            <View style={styles.meCard}>
                {currentUser &&
                    <LeaderboardCard
                        {...currentUser}
                        username={i18n.t("leaderboard:Me")}
                    />
                }
            </View>
            <View style={styles.topUsers}>

            </View>
        </View>
    )
}

export default LeaderboardScreen

const styles = StyleSheet.create({
    meCard: {
        marginVertical: 30
    },
    topUsers: {

    }
})