import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import globalStyles from '../../styles/global'
import { useTheme } from '../../contexts/ThemeContext'

import { Button } from 'react-native-paper'

const LessonsScreen = () => {
    const { toggleTheme } = useTheme()

    return (
        <View style={globalStyles.container}>
            <Text>LessonsScreen</Text>
            <Button onPress={toggleTheme} mode="contained">
                Change theme
            </Button>

        </View>
    )
}

export default LessonsScreen

const styles = StyleSheet.create({})