import { StyleSheet, Dimensions } from 'react-native'
import { Card, Subheading, Surface, Text } from 'react-native-paper'
import React from 'react'

const CollectionCard = ({ collected = false, name, thumbnail }) => {
    const dimensions = Dimensions.get("window")
    const cardStyles = { ...styles.card, width: (dimensions.width / 2) - 55 }

    if (collected) {
        return (
            <Card style={cardStyles}>
                {thumbnail && (
                    <Card.Cover
                        style={styles.image}
                        resizeMode="stretch"
                        source={thumbnail}
                    />
                )}
                <Surface style={styles.cardContent}>
                    <Subheading style={styles.rewardName}>
                        {name}
                    </Subheading>
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