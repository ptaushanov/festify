import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper';

import { useTheme, Surface, Headline, Subheading, Button } from 'react-native-paper';
import i18n from 'i18n-js';

const LessonCard = ({ thumbnailSize = 80, lessonThumbnail, onContinuePress }) => {
    const { colors } = useTheme()
    const themedCircleStyles = { borderColor: colors.surface }

    return (
        <Surface style={styles.surface}>
            {lessonThumbnail &&
                <View style={[styles.thumbnail, themedCircleStyles]}>
                    <Avatar.Image size={thumbnailSize} source={lessonThumbnail} />
                </View>
            }
            <Headline style={styles.headline}>
                Test Lesson
            </Headline>
            <Subheading style={styles.subheading}>
                {i18n.t("home:Pick up where you left off")}
            </Subheading>
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
        borderRadius: 6,
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
        textAlign: "center"
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