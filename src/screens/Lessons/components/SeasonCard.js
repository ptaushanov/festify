import { StyleSheet, ImageBackground } from 'react-native'
import { Card, Surface, TouchableRipple } from 'react-native-paper'
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
                        locked ? "transparent" : "rgba(200, 255, 255, .3)"
                    }
                >
                    <Card.Content style={[
                        styles.cardContent,
                        { backgroundColor: locked ? 'rgba(0,0,0, 0.65)' : 'rgba(0,0,0, 0.35)' }
                    ]}>
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

const styles = StyleSheet.create({
    surface: {
        elevation: 4,
        borderRadius: 10,
    },
    card: {
        width: "auto",
        height: "auto",
    },
    ripple: {
        borderRadius: 10,
    },
    cardContent: {
        paddingVertical: 18,
        borderRadius: 10,
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