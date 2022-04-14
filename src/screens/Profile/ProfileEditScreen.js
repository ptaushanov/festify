import { StyleSheet, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'

import StyledAvatar from './components/StyledAvatar'
import StyledTextInput from '../../shared/TextInput/StyledTextInput'
import globalStyles from '../../styles/global'
import Button from '../../shared/Button/Button'
import { useTheme, Text } from 'react-native-paper'
import { useProfileInfo } from '../../contexts/ProfileContext'
import ImagePicker from './components/ImagePicker'
import PillNotification from '../../shared/Notifications/PillNotification'

import { checkDuplicateUsername } from '../../services/authenticate'

import i18n from 'i18n-js'

const ProfileEditScreen = () => {
    const [newUsername, setNewUsername] = useState("")
    const [newAvatar, setNewAvatar] = useState(null)

    const [usernameError, setUsernameError] = useState(null)
    const [pickImageOpen, setPickImageOpen] = useState(false)
    const [notificationVisible, setNotificationVisible] = useState(false)

    const { colors } = useTheme()

    useEffect(() => {
        setNewUsername(username)
    }, [username])

    const { username, email, avatar, updateProfile, saveAvatar } = useProfileInfo()
    const handleUsernameChanged = (uname) => { setNewUsername(uname) }

    const verifyUsernameNotDuplicate = async (newUsername) => {
        try {
            const isDuplicate = await checkDuplicateUsername(newUsername)
            const duplicateErrorMessage = i18n.t("auth:username-exists")
            setUsernameError(isDuplicate ? duplicateErrorMessage : null)
        } catch (error) {
            console.error(error)
        }
    }

    const handleUsernameValidation = () => {
        if (newUsername.length < 4) {
            setUsernameError(i18n.t("change-profile:username-min").replace("{0}", 4))
        }
        else if (newUsername.length > 512) {
            setUsernameError(i18n.t("change-profile:username-max").replace("{0}", 512))
        } else {
            if (username === newUsername) {
                setUsernameError(null)
                return
            }
            verifyUsernameNotDuplicate(newUsername)
        }
    }

    const handleSaveChanges = async () => {
        let newAvatarUploadedURL = null;

        if (newAvatar) {
            newAvatarUploadedURL = await saveAvatar(newAvatar)
        }

        const updated = await updateProfile({ newUsername, newAvatar: newAvatarUploadedURL })
        updated && setNotificationVisible(true)
    }

    const handleOpenImagePicker = () => setPickImageOpen(true)

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <>
                <KeyboardAvoidingView
                    style={globalStyles.slimContainer}
                    behavior='height'
                >
                    <View style={styles.profilePictureContainer}>
                        <StyledAvatar
                            username={username}
                            image={newAvatar || avatar}
                            size={70}
                            style={styles.avatar}
                        />
                        <Button
                            mode="contained"
                            size={3}
                            onPress={handleOpenImagePicker}
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
                            value={email}
                        />
                    </View>
                    <View style={styles.saveContainer}>
                        <View>
                            <PillNotification
                                text={i18n.t("change-profile:Saved")}
                                visible={notificationVisible}
                                onAnimationEnd={() => setNotificationVisible(false)}
                            />
                        </View>
                        <Button
                            mode="contained"
                            disabled={Boolean(usernameError)}
                            onPress={handleSaveChanges}
                        >
                            {i18n.t("change-profile:Save")}
                        </Button>
                    </View>
                </KeyboardAvoidingView>
                <ImagePicker
                    isOpen={pickImageOpen}
                    setOpen={setPickImageOpen}
                    setImage={setNewAvatar}
                />
            </>
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
        marginTop: 100,
    },

})