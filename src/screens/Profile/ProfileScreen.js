import { StyleSheet, View } from 'react-native'
import React from 'react'

import { auth } from '../../../firebase.v8'
import { useNavigation } from '@react-navigation/core'
import globalStyles from '../../styles/global'
import { Button, Text } from 'react-native-paper'

import { useTheme } from '../../contexts/ThemeContext'

const ProfileScreen = () => {

    const navigation = useNavigation()
    const { toggleTheme } = useTheme()


    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    return (
        <View style={globalStyles.container}>
            <Text>Email: {auth.currentUser?.email}</Text>
            <Button
                style={styles.button}
                contentStyle={styles.buttonContent}
                onPress={handleSignOut}
                mode="contained"
            >
                Sign out
            </Button>

            <Button
                onPress={toggleTheme}
                mode="contained"
                style={styles.button}
                contentStyle={styles.buttonContent}
            >
                Change theme
            </Button>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    button: {
        width: "50%",
        borderRadius: 10,
        marginTop: 20
    },
    buttonContent: {
        width: "100%",
        padding: 5,
        alignItems: "center",
    }
})