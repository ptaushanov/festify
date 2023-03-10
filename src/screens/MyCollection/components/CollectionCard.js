import { StyleSheet, Dimensions, Image } from 'react-native'
import { Card, Text } from 'react-native-paper'
import React from 'react'

import noImage from "../../../assets/images/no_image.jpg"

const CollectionCard = ({ collected = false, name, thumbnail }) => {
    const dimensions = Dimensions.get("window")
    const calculatedWidth = dimensions.width / 2 - 55
    const cardStyles = { ...styles.card, width: calculatedWidth, minHeight: calculatedWidth }

    if (collected) {
        return (
            <Card
                style={cardStyles}
                contentStyle={styles.contentContainer}
                elevation={2}
            >
                <Image
                    style={styles.image}
                    borderTopLeftRadius={18}
                    borderTopRightRadius={18}
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
        flex: 3,
        minHeight: 100,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
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
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 16,
        justifyContent: "center"
    },
    rewardName: {
        textAlign: "center",
        flexWrap: "wrap",
    },
    cardUnknownContent: {
        aspectRatio: 1 / 1,
        alignItems: "center",
        justifyContent: "center",
    },
    contentContainer: {
        flex: 1,
    }
})