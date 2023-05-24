import { FlatList, Platform } from 'react-native'
import StyleSheet from "react-native-media-query"

import React, { useState, useCallback } from 'react'
import CollectionTitle from './components/CollectionTitle'
import CollectionCard from './components/CollectionCard'
import BounceView from '../../shared/Transitions/BounceView'
import { useFocusEffect } from '@react-navigation/native'
import { findRewards, findUserRewards } from '../../services/rewards-services'
import { auth } from '../../../firebase.v9'

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
            data={rewards}
            keyExtractor={(reward) => reward.id}
            renderItem={({ item: props, index }) => (
                <BounceView delay={index * 100}>
                    <CollectionCard {...props} />
                </BounceView>
            )}
            ListHeaderComponent={() => (
                <CollectionTitle />
            )}
            contentContainerStyle={styles.collectionContainer}
            columnWrapperStyle={{ justifyContent: "space-evenly" }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.collection}
            dataSet={{ media: ids.collection }}
            numColumns={Platform.OS === "web" ? 6 : 2}
        />
    )
}

export default MyCollectionScreen

const { styles, ids } = StyleSheet.create({
    collection: {
        flex: 1,
        "@media only screen and (min-width: 640px)": {
            paddingHorizontal: 80,
        }
    },
    collectionContainer: {
        padding: 20,
    }
})