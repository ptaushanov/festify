import { StyleSheet, TextInput } from 'react-native'
import React from 'react'

const StyledTextInput = (props) => {
    return (
        <TextInput
            {...props}
            style={[
                styles.input,
                props.style,
            ]}
        />
    )
}

export default StyledTextInput

const styles = StyleSheet.create({
    input: {
        backgroundColor: "whitesmoke",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    }
})