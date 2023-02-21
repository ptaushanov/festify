import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper';
import { MaterialIcons } from "@expo/vector-icons"

import { useTheme } from 'react-native-paper';

const TimelineCircle = ({ size = 80, image, locked = true }) => {
    const { colors } = useTheme()

    return (
        <View style={[styles.circle, { borderColor: colors.surfaceVariant }]} >
            {image && <Avatar.Image size={size} source={image} />}
            {locked &&
                <View style={styles.lockContainer}>
                    <MaterialIcons
                        name="lock"
                        size={25}
                        style={{ color: colors.inverseOnSurface }}
                    />
                </View>
            }
        </View>
    )
}

export default TimelineCircle

const styles = StyleSheet.create({
    circle: {
        borderRadius: 100,
        borderWidth: 6,
        zIndex: 2
    },
    lockContainer: {
        backgroundColor: 'rgba(0,0,0, 0.35)',
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
})