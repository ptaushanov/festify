import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from "../../../firebase.v8"

import StyledAvatar from './components/StyledAvatar'
import StyledTextInput from '../../shared/TextInput/StyledTextInput'
import { getProfilePictureURL, getUsername } from '../../services/profile-services'
import globalStyles from '../../styles/global'
import Button from '../../shared/Button/Button'
import { useTheme, Text } from 'react-native-paper'

import i18n from 'i18n-js'

const ProfileEditScreen = () => {
    const [image, setImage] = useState(null);
    const [username, setUsername] = useState("")
    const { colors } = useTheme()

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
                    style={styles.avatar}
                />
                <Button
                    mode="contained"
                    size={3}
                    onPress={() => { }}
                >{i18n.t("change-profile:Change picture")}</Button>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    {i18n.t("change-profile:Username")}
                </Text>
                <StyledTextInput
                    style={[styles.input, { borderColor: colors.primary }]}
                />

                <Text style={styles.label}>
                    {i18n.t("change-profile:Email")}
                </Text>
                <StyledTextInput
                    disabled
                    style={[styles.input, { borderColor: colors.primary }]}
                />
            </View>
        </View>
    )
}

export default ProfileEditScreen

const styles = StyleSheet.create({
    profilePictureContainer: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 20
    },
    avatar: {
        marginRight: 10
    },
    inputContainer: {
        marginTop: 30,
        marginHorizontal: 10
    },
    input: {
        borderWidth: 2,
        paddingVertical: 8,
    },
    label: {
        paddingLeft: 5,
        fontSize: 16,
        marginTop: 15
    }
})