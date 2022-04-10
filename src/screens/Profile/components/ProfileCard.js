import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Surface, Text, IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../../../../firebase.v8'

import { getProfilePictureURL, getUsername } from '../../../services/profile-services'
import StyledAvatar from './StyledAvatar'

const ProfileCard = () => {
    const navigation = useNavigation()

    const [image, setImage] = useState(null);
    const [username, setUsername] = useState("");

    const handleInfoEdit = () => {
        navigation.navigate("Edit Profile")
    }

    useEffect(() => {
        if (auth.currentUser) {
            getUsername(auth.currentUser.uid)
                .then(uname => setUsername(uname))
        }

        getProfilePictureURL(auth.currentUser.uid)
            .then((url) => setImage(url))
    }, [])

    return (
        <Surface style={styles.surface}>
            <StyledAvatar
                style={styles.avatar}
                size={70}
                image={image}
                username={username}
            />
            <IconButton
                icon="circle-edit-outline"
                size={20}
                onPress={handleInfoEdit}
                style={styles.edit}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.email}>{auth.currentUser?.email}</Text>
            </View>

        </Surface>
    )
}

export default ProfileCard

const styles = StyleSheet.create({
    surface: {
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 10,
        elevation: 2,
    },
    avatar: {
        marginTop: -40,
    },
    infoContainer: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "center",
        marginRight: 20,
    },
    username: {
        fontSize: 16,
        fontWeight: "bold",
    },
    email: {
        fontSize: 14,
    },
    edit: {
        position: "absolute",
        right: 5,
    }
})