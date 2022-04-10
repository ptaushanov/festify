import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { Text, useTheme } from 'react-native-paper'

const StyledTextInput = ({ error = false, helperText = '', helperTextStyles = {}, style, disabled = false, ...otherProps }) => {
    const { colors } = useTheme();

    const inputThemeStyle = {
        backgroundColor: colors.surfaceInput,
        color: disabled ? colors.textDisabled : colors.text
    }

    return (
        <View>
            <TextInput
                style={[
                    styles.input,
                    style,
                    inputThemeStyle
                ]}
                {...otherProps}
                editable={!disabled}
                selectTextOnFocus={!disabled}
            />
            <Text style={[
                styles.helperText,
                {
                    display: helperText ? "flex" : "none",
                    color: error ? colors.danger : "#333"
                },
                helperTextStyles
            ]}>
                {helperText}
            </Text>
        </View>
    )
}

export default StyledTextInput

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    helperText: {
        fontSize: 14
    }
})