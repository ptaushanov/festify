import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import globalStyles from '../../styles/global'
import { Text, Button } from 'react-native-paper'

const HomeScreen = () => {

    const handlePress = () => {

    }

    return (
        <View style={globalStyles.container}>
            <Text>HomeScreen</Text>
            <Button onPress={handlePress} mode="contained">Click me</Button>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})