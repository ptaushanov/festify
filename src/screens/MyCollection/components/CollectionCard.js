import { StyleSheet, Dimensions } from 'react-native'
import { Card, Surface, Text } from 'react-native-paper'
import React from 'react'

import noImage from "../../../assets/images/no_image.jpg"

const CollectionCard = ({ collected = false, name, thumbnail }) => {
    const dimensions = Dimensions.get("window")
    const cardStyles = { ...styles.card, width: (dimensions.width / 2) - 55 }

    if (collected) {
        return (
            <Card style={cardStyles}>
                <Card.Cover
                    style={styles.image}
                    resizeMode="stretch"
                    source={thumbnail ? { uri: thumbnail } : noImage}
                />
                <Surface style={styles.cardContent}>
                    <Text variant="titleMedium" style={styles.rewardName}>
                        {name}
                    </Text>
                </Surface>
            </Card>
        )
    }

    return (
        <Card style={[cardStyles, styles.cardUnknown]}>
            <Card.Content style={styles.cardUnknownContent}>
                <Text style={styles.unknownText}>?</Text>
            </Card.Content>
        </Card>
    )
}

export default CollectionCard

const styles = StyleSheet.create({
    image: {
        height: 100,
    },
    card: {
        elevation: 3,
        marginVertical: 10,
    },
    cardUnknown: {
        aspectRatio: 1 / 1
    },
    cardContent: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
    },
    rewardName: {
        textAlign: "center",
        flexWrap: "wrap"
    },
    cardUnknownContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    unknownText: {
        fontSize: 35,

    }
})