import { StyleSheet, TextInput as TextInputMobile, View, Platform } from 'react-native'
import { TextInput as TextInputWeb } from 'react-native-web'
import React from 'react'
import { Text, useTheme } from 'react-native-paper'
import { useTheme as useThemeCustom } from '../../contexts/ThemeContext'

const isMobile = Platform.OS === 'ios' || Platform.OS === 'android'
const TextInput = isMobile ? TextInputMobile : TextInputWeb

const StyledTextInput = ({
    error = false,
    helperText = '',
    helperTextStyles = {},
    style,
    disabled = false,
    ...otherProps
}) => {
    const { colors } = useTheme();
    const { darkMode } = useThemeCustom();

    const inputThemeStyle = {
        backgroundColor: darkMode ? colors.backdrop : colors.surfaceVariant,
        color: disabled ? colors.outlineVariant : colors.onSurfaceVariant,
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
                placeholderTextColor={colors.textDisabled}
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