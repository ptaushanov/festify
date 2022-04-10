import { StyleSheet, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
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
    const [newUsername, setNewUsername] = useState("")

    const [usernameError, setUsernameError] = useState(null)
    const { colors } = useTheme()

    useEffect(() => {
        if (auth.currentUser) {
            getUsername(auth.currentUser.uid)
                .then(uname => {
                    setUsername(uname)
                    setNewUsername(uname)
                })
                .catch(error => console.error(error))
        }

        getProfilePictureURL(auth.currentUser.uid)
            .then(url => setImage(url))
            .catch(error => console.error(error))
    }, [])

    const handleUsernameChanged = (uname) => { setNewUsername(uname) }

    const handleUsernameValidation = () => {
        if (newUsername.length < 4) {
            setUsernameError(i18n.t("change-profile:username-min").replace("{0}", 4))
        }
        else if (newUsername.length > 512) {
            setUsernameError(i18n.t("change-profile:username-max").replace("{0}", 512))
        } else {
            setUsernameError(null)
        }
    }

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <KeyboardAvoidingView
                style={globalStyles.slimContainer}
                behavior='height'
            >
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
                        value={newUsername}
                        onChangeText={handleUsernameChanged}
                        onBlur={handleUsernameValidation}
                        error={Boolean(usernameError)}
                        helperText={usernameError}
                    />

                    <Text style={styles.label}>
                        {i18n.t("change-profile:Email")}
                    </Text>
                    <StyledTextInput
                        disabled
                        style={[styles.input, { borderColor: colors.primary }]}
                        value={auth.currentUser.email}
                    />
                </View>
                <View style={styles.saveContainer}>
                    <Button
                        mode="contained"
                        disabled={Boolean(usernameError)}
                    >
                        {i18n.t("change-profile:Save")}
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
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
        marginHorizontal: 10,
    },
    input: {
        borderWidth: 2,
        paddingVertical: 8,
    },
    label: {
        paddingLeft: 5,
        fontSize: 16,
        marginTop: 15
    },
    saveContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: 100
    }
})