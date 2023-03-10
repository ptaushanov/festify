import { StyleSheet, View, FlatList } from 'react-native'
import React, { useState, useCallback } from 'react'
import LeaderboardTitle from './components/LeaderboardTitle'
import LeaderboardCard from './components/LeaderboardCard'
import SlidingView from '../../shared/Transitions/SlidingView'
import { useFocusEffect } from '@react-navigation/native'
import { auth } from '../../../firebase.v9'
import {
    updateUser,
    findUserPlace,
    updateUsersSorted
} from '../../services/leaderboard-services'

import i18n from 'i18n-js'

const LeaderboardScreen = () => {
    const [currentUser, setCurrentUser] = useState(null)
    const [users, setUsers] = useState([])

    const updateCurrentUser = async (userData) => {
        try {
            const _currentUser = { ...userData }
            _currentUser.place = await findUserPlace(_currentUser.xp)
            setCurrentUser(_currentUser)
        } catch (error) {
            console.error(error)
        }
    }

    useFocusEffect(
        useCallback(() => {
            const unsubscribeUser =
                updateUser(auth.currentUser.uid, updateCurrentUser, console.error)
            let unsubscribeUsers = updateUsersSorted(setUsers, console.error)

            return () => {
                unsubscribeUser()
                unsubscribeUsers()
                setCurrentUser(null)
                setUsers(null)
            }
        }, [])
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={(user) => user.place}
                renderItem={({ item: props, index }) => (
                    <SlidingView delay={index * 200} direction={"right"}>
                        <LeaderboardCard {...props} />
                    </SlidingView>
                )}
                ListHeaderComponent={() => (
                    <View>
                        <LeaderboardTitle />
                        {currentUser ? (
                            <View
                                style={styles.meCard}
                            >
                                <SlidingView>
                                    <LeaderboardCard
                                        {...currentUser}
                                        username={i18n.t("leaderboard:Me")}
                                    />
                                </SlidingView>
                            </View>
                        ) : null}
                    </View>
                )}
                contentContainerStyle={styles.topUsersContainer}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default LeaderboardScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    meCard: {
        marginVertical: 30
    },
    activityIndicator: {
        flex: 1,
    },
    topUsersContainer: {
        paddingVertical: 20
    },

})