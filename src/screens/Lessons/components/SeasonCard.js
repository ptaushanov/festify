import { ImageBackground } from 'react-native'
import StyleSheet from "react-native-media-query"
import { Card, Surface, TouchableRipple, Text } from 'react-native-paper'
import { MaterialIcons } from "@expo/vector-icons"
import React from 'react'

const SeasonCard = ({ title = "", subtitle = "", image, onCardPress, locked = true }) => {
    return (
        <Surface style={styles.surface}>
            <ImageBackground
                source={image}
                style={styles.card}
                imageStyle={styles.cardImage}
            >
                <TouchableRipple
                    borderless
                    onPress={locked ? null : onCardPress}
                    style={styles.ripple}
                    rippleColor={
                        locked ? "transparent" : "rgba(200, 255, 255, .4)"
                    }
                >
                    <Card.Content style={[
                        styles.cardContent,
                        { backgroundColor: locked ? 'rgba(0,0,0, 0.65)' : 'rgba(0,0,0, 0.35)' }
                    ]} dataSet={{ media: ids.cardContent }}>
                        <Text variant="titleLarge" style={styles.text}>
                            {title}
                        </Text>
                        <Text variant="bodyMedium" style={[styles.text, styles.paragraph]}>
                            {subtitle}
                        </Text>
                        {locked && <MaterialIcons
                            name="lock"
                            size={25}
                            style={styles.lock}
                        />}
                    </Card.Content>
                </TouchableRipple>
            </ImageBackground>
        </Surface>
    )
}

export default SeasonCard

const { styles, ids } = StyleSheet.create({
    surface: {
        flex: 1,
        elevation: 4,
        borderRadius: 10
    },
    card: {
        flex: 1,
        width: "auto",
        height: "auto",
    },
    ripple: {
        flex: 1,
        borderRadius: 10,
    },
    cardContent: {
        flex: 1,
        paddingVertical: 20,
        borderRadius: 10,
        "@media only screen and (min-width: 640px)": {
            justifyContent: "flex-end"
        }
    },
    cardImage: {
        borderRadius: 10,
    },
    text: {
        color: "white"
    },
    lock: {
        position: "absolute",
        right: 10,
        bottom: 10,
        color: "#ddd"
    }
})