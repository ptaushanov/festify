import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from "../../../firebase.v8"

import StyledAvatar from './components/StyledAvatar'
import { getProfilePictureURL, getUsername } from '../../services/profile-services'
import globalStyles from '../../styles/global'
import Button from '../../shared/Button/Button'

const ProfileEditScreen = () => {
    const [image, setImage] = useState(null);
    const [username, setUsername] = useState("")

    useEffect(() => {
        if (auth.currentUser) {
            getUsername(auth.currentUser.uid)
                .then(uname => setUsername(uname))
                .catch(error => console.error(error))
        }

        getProfilePictureURL(auth.currentUser.uid)
            .then(url => setImage(url))
            .catch(error => console.error(error))
    }, [])

    return (
        <View style={globalStyles.slimContainer}>
            <View style={styles.profilePictureContainer}>
                <StyledAvatar
                    username={username}
                    image={image}
                    size={70}
                />
                <Button
                    mode="contained"
                    onPress={() => { }}
                >Hello</Button>
            </View>
        </View>
    )
}

export default ProfileEditScreen

const styles = StyleSheet.create({
    profilePictureContainer: {
        flexDirection: "row"
    }
})