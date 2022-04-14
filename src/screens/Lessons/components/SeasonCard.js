import { StyleSheet, ImageBackground } from 'react-native'
import { Card, Title, Paragraph, Surface, TouchableRipple } from 'react-native-paper'
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
                    onPress={onCardPress}
                    rippleColor={
                        locked ? "transparent" : "rgba(255, 255, 255, .32)"
                    }
                >
                    <Card.Content style={[
                        styles.cardContent,
                        { backgroundColor: locked ? 'rgba(0,0,0, 0.6)' : 'rgba(0,0,0, 0.32)' }
                    ]}>
                        <Title style={styles.text}>
                            {title}
                        </Title>
                        <Paragraph style={[styles.text, styles.paragraph]}>
                            {subtitle}
                        </Paragraph>
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
    cardContent: {
        paddingVertical: 12,
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