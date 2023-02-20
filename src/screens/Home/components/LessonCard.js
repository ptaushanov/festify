import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper';

import { useTheme, Surface, Button, Text } from 'react-native-paper';
import i18n from 'i18n-js';

const LessonCard = ({
    thumbnailSize = 80,
    lessonTitle = "",
    lessonThumbnail,
    onContinuePress
}) => {
    const { colors } = useTheme()
    const themedCircleStyles = { borderColor: colors.surface }

    return (
        <Surface style={styles.surface}>
            {lessonThumbnail &&
                <View style={[styles.thumbnail, themedCircleStyles]}>
                    <Avatar.Image size={thumbnailSize} source={lessonThumbnail} />
                </View>
            }
            <Text variant="headlineSmall" style={styles.headline}>
                {lessonTitle}
            </Text>
            <Text variant="titleMedium" style={styles.subheading}>
                {i18n.t("home:Pick up where you left off")}
            </Text>
            <Button
                mode="contained"
                style={styles.buttonContainer}
                contentStyle={styles.button}
                onPress={onContinuePress}
            >
                {i18n.t("home:Continue")}
            </Button>
        </Surface>
    )
}

export default LessonCard

const styles = StyleSheet.create({
    surface: {
        marginVertical: 20,
        borderRadius: 10,
        elevation: 2,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },
    thumbnail: {
        borderRadius: 100,
        borderWidth: 4,
        elevation: 2,
        marginTop: -30
    },
    headline: {
        textAlign: "center",
        fontSize: 20,
        lineHeight: 25
    },
    subheading: {
        textAlign: "center",
        marginBottom: 10
    },
    buttonContainer: {
        marginBottom: 18
    },
    button: {
        paddingHorizontal: 10
    }
})