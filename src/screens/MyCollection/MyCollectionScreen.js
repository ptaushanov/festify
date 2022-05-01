import { StyleSheet, FlatList } from 'react-native'
import React, { useState, useCallback } from 'react'
import CollectionTitle from './components/CollectionTitle'
import CollectionCard from './components/CollectionCard'

import { useFocusEffect } from '@react-navigation/native'
import { findRewards, findUserRewards } from '../../services/rewards-services'
import { auth } from '../../../firebase.v8'

const MyCollectionScreen = () => {
    const [rewards, setRewards] = useState([])

    const remapRewards = (allRewards, userRewards) => {
        return allRewards.map(reward => ({
            ...reward,
            collected: userRewards.includes(reward.id)
        }))
    }

    const getRewards = async () => {
        try {
            const userRewards = await findUserRewards(auth.currentUser.uid)
            const allRewards = await findRewards()
            const remappedRewards = remapRewards(allRewards, userRewards)

            setRewards(remappedRewards)
        } catch (error) {
            console.error(error)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getRewards()
            return () => { setRewards(null) }
        }, [])
    )

    return (
        <FlatList
            key="#"
            data={rewards}
            keyExtractor={(reward) => reward.id}
            renderItem={({ item: props }) => (
                <CollectionCard {...props} />
            )}
            ListHeaderComponent={() => (
                <CollectionTitle />
            )}
            contentContainerStyle={styles.collectionContainer}
            columnWrapperStyle={{ justifyContent: "space-evenly" }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.collection}
            numColumns={2}
        />
    )
}

export default MyCollectionScreen

const styles = StyleSheet.create({
    collection: {
        flex: 1
    },
    collectionContainer: {
        padding: 20,
    }
})