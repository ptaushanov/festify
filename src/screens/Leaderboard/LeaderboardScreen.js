import { StyleSheet, View } from 'react-native'
import Animated, { SlideInRight, Layout } from 'react-native-reanimated'
import React, { useState, useCallback, Fragment } from 'react'
import globalStyles from '../../styles/global'
import LeaderboardTitle from './components/LeaderboardTitle'
import LeaderboardCard from './components/LeaderboardCard'
import { ActivityIndicator } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
import { auth } from '../../../firebase.v8'
import {
    findUser,
    findUserPlace,
    updateUsersSorted
} from '../../services/leaderboard-services'

import i18n from 'i18n-js'

const LeaderboardScreen = () => {
    const [currentUser, setCurrentUser] = useState(null)
    const [users, setUsers] = useState(null)

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
                <Fragment>
                    <LeaderboardTitle />
                    <View style={styles.meCard}>
                        <LeaderboardCard
                            {...currentUser}
                            username={i18n.t("leaderboard:Me")}
                        />
                    </View>
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
                        style={styles.topUsers}
                        contentContainerStyle={styles.topUsersContainer}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />
                </Fragment> :
                <ActivityIndicator
                    size="large"
                    style={styles.activityIndicator}
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
        flex: 1
    },
    topUsers: {

    },
    topUsersContainer: {

    },

})