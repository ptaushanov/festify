import { StyleSheet, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import CollectionTitle from './components/CollectionTitle'
import CollectionCard from './components/CollectionCard'
import placeholder from "../../assets/images/placeholder.jpg"

const MyCollectionScreen = () => {
    const [rewards, setRewards] = useState([
        { id: 1, name: "Овча глава от Аврамовград", thumbnail: placeholder, collected: true },
        { id: 2, name: "My Reward 1", thumbnail: placeholder, collected: true },
        { id: 3, name: "My Reward 1", thumbnail: placeholder, collected: true },
        { id: 4, name: "My Reward 1", thumbnail: placeholder },
        { id: 5, name: "My Reward 1", thumbnail: placeholder },
        { id: 6, name: "My Reward 1", thumbnail: placeholder }
    ])

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