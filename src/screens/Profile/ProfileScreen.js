import { StyleSheet, View } from 'react-native'
import React from 'react'

import { auth } from '../../../firebase.v8'

import ProfileCard from './components/ProfileCard'
import ProfileList from './components/ProfileList'

const ProfileScreen = () => {
    return (
        <View>
            <View style={styles.container}>
                <ProfileCard
                    username="Jake"
                    email={auth.currentUser?.email}
                    onInfoEdit={() => { alert("Hello") }}
                />
            </View>
            <ProfileList />
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        padding: 40,
        marginTop: 20
    },
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