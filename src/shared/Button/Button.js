import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button as PaperButton, useTheme } from 'react-native-paper'

const Button = ({ children, style, size = 5, fullWidth = false, ...otherProps }) => {
    const { colors } = useTheme()

    return (
        <View style={styles.buttonContainer}>
            <PaperButton
                style={[style, styles.button, { width: fullWidth ? "100%" : "auto" }]}
                contentStyle={[styles.buttonContent, { padding: size }]}
                color={colors.primary}
                {...otherProps}
            >
                {children}
            </PaperButton>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        marginVertical: 2,
        justifyContent: "center",
    },
    buttonContent: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    }
})