import { StyleSheet, View } from 'react-native'
import React from 'react'

import { useTheme } from 'react-native-paper'

const ProgressIndicator = ({ steps, currentStep }) => {
    const { colors } = useTheme()

    const stepMarkers = Array(steps)
        .fill(null)
        .map((_, id) => (
            <View style={[
                { backgroundColor: colors.primary },
                currentStep === id ?
                    { backgroundColor: colors.accent } : null,
                styles.step
            ]} />
        ))

    return (
        <View style={styles.stepContainer}>
            {stepMarkers}
        </View>
    )
}

export default ProgressIndicator

const styles = StyleSheet.create({
    stepContainer: {
        marginTop: 40,
        paddingHorizontal: 15,
        flexDirection: "row"
    },
    step: {
        flex: 1,
        height: 8,
        marginHorizontal: 5,
        borderRadius: 100,
    }
})