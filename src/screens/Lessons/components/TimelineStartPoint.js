import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'

const TimelineStartPoint = () => {
    const { colors } = useTheme();

    return (
        <View style={[
            styles.point,
            { borderColor: colors.primary }
        ]} />
    )
}

export default TimelineStartPoint

const styles = StyleSheet.create({
    point: {
        width: 30,
        aspectRatio: 1 / 1,
        marginLeft: 22,
        borderRadius: 100,
        borderWidth: 2
    }
})