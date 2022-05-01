import { StyleSheet, View, ActivityIndicator } from 'react-native'
import Animated, { SlideInRight, Layout } from 'react-native-reanimated'
import React, { useState, useCallback } from 'react'
import globalStyles from '../../styles/global'
import LeaderboardTitle from './components/LeaderboardTitle'
import LeaderboardCard from './components/LeaderboardCard'
import { useFocusEffect } from '@react-navigation/native'
import { auth } from '../../../firebase.v8'
import { useTheme } from 'react-native-paper'
import {
    findUser,
    findUserPlace,
    updateUsersSorted
} from '../../services/leaderboard-services'

import i18n from 'i18n-js'

const LeaderboardScreen = () => {
    const [currentUser, setCurrentUser] = useState(null)
    const [users, setUsers] = useState(null)
    const { colors } = useTheme()

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
            let unsubscribe = updateUsersSorted(setUsers, console.error)
            return () => {
                unsubscribe()
                setCurrentUser(null)
                setUsers(null)
            }
        }, [])
    )

    return (
        <View style={globalStyles.slimContainer}>
            {currentUser && users ?
                <Animated.FlatList
                    data={users}
                    keyExtractor={(user) => user.place}
                    renderItem={({ item: props }) => (
                        <Animated.View
                            entering={SlideInRight.delay(props.place * 100)}
                            layout={Layout.springify()}
                        >
                            <LeaderboardCard {...props} />
                        </Animated.View>
                    )}
                    ListHeaderComponent={() => (
                        <View>
                            <LeaderboardTitle />

                            <View style={styles.meCard}>
                                <LeaderboardCard
                                    {...currentUser}
                                    username={i18n.t("leaderboard:Me")}
                                />
                            </View>
                        </View>
                    )}
                    style={styles.topUsers}
                    contentContainerStyle={styles.topUsersContainer}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                /> :
                <ActivityIndicator
                    size="large"
                    style={styles.activityIndicator}
                    color={colors.primary}
                    animating={!currentUser || !users}
                />
            }
        </View>
    )
}

export default LeaderboardScreen

const styles = StyleSheet.create({
    meCard: {
        marginVertical: 30
    },
    activityIndicator: {
        flex: 1,
        transform: [{ scale: 1.5 }]
    },
    topUsers: {

    },
    topUsersContainer: {

    },

})