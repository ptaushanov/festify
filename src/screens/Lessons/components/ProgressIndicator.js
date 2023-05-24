import { View } from 'react-native'
import StyleSheet from "react-native-media-query"
import React from 'react'

import { useTheme } from 'react-native-paper'

const ProgressIndicator = ({ steps, currentStep }) => {
    const { colors } = useTheme()

    const stepMarkers = Array(steps)
        .fill(null)
        .map((_, id) => (
            <View key={id} style={[
                { backgroundColor: colors.primary },
                currentStep === id ?
                    { backgroundColor: colors.accent } : null,
                styles.step
            ]} />
        ))

    return (
        <View style={styles.stepContainer} dataSet={{ media: ids.stepContainer }} >
            {stepMarkers}
        </View>
    )
}

export default ProgressIndicator

const { styles, ids } = StyleSheet.create({
    stepContainer: {
        marginTop: 30,
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: "row",
        "@media only screen and (min-width: 640px)": {
            paddingHorizontal: "10%"
        }
    },
    step: {
        flex: 1,
        height: 8,
        marginHorizontal: 5,
        borderRadius: 100,
    }
})