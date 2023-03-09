import { StyleSheet, Dimensions } from 'react-native'
import { Card, Text } from 'react-native-paper'
import React from 'react'

import noImage from "../../../assets/images/no_image.jpg"

const CollectionCard = ({ collected = false, name, thumbnail }) => {
    const dimensions = Dimensions.get("window")
    const cardStyles = { ...styles.card, width: (dimensions.width / 2) - 55 }

    if (collected) {
        return (
            <Card style={cardStyles} elevation={2}>
                <Card.Cover
                    style={styles.image}
                    borderBottomLeftRadius={0}
                    borderBottomRightRadius={0}
                    resizeMode="cover"
                    source={thumbnail ? { uri: thumbnail } : noImage}
                />
                <Card.Content style={styles.cardContent}>
                    <Text variant="titleSmall" style={styles.rewardName}>
                        {name}
                    </Text>
                </Card.Content>
            </Card>
        )
    }

    return (
        <Card style={[cardStyles, styles.cardUnknown]}>
            <Card.Content style={styles.cardUnknownContent}>
                <Text variant="headlineMedium">?</Text>
            </Card.Content>
        </Card>
    )
}

export default CollectionCard

const styles = StyleSheet.create({
    image: {
        height: 100,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    card: {
        flex: 1,
        marginVertical: 10,
    },
    cardUnknown: {
        flex: 1,
        justifyContent: "space-around"
    },
    cardContent: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
    },
    rewardName: {
        textAlign: "center",
        flexWrap: "wrap",
    },
    cardUnknownContent: {
        aspectRatio: 1 / 1,
        alignItems: "center",
        justifyContent: "center",
    }
})