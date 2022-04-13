import { StyleSheet, View, Animated } from 'react-native'
import React from 'react'
import { useTheme, Text } from 'react-native-paper'

import FadingView from '../Transitions/FadingView'

const PillNotification = ({
    text = "",
    fadeInDuration = 500,
    fadeOutDuration = 3000,
    pauseDuration = 2000,
    visible = false,
    onAnimationEnd
}) => {
    const { colors } = useTheme()

    return (
        <FadingView
            style={styles.container}
            fadeInDuration={fadeInDuration}
            fadeOutDuration={fadeOutDuration}
            pauseDuration={pauseDuration}
            visible={visible}
            onAnimationEnd={onAnimationEnd}
        >
            <View style={[styles.pill, {
                backgroundColor: colors.surfacePicker,
                borderColor: colors.primary
            }]}>
                <Text style={[styles.text, { color: colors.primary }]}>
                    {text}
                </Text>
            </View>
        </FadingView>
    )
}

export default PillNotification

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    pill: {
        borderRadius: 40,
        paddingHorizontal: 25,
        paddingVertical: 8,
        marginVertical: 10,
        borderWidth: 1
    }
})