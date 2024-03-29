import { View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import StyleSheet from "react-native-media-query"

import StyledAvatar from '../../shared/StyledAvatar/StyledAvatar'
import StyledTextInput from '../../shared/TextInput/StyledTextInput'
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
    const { username, email, avatar, updateProfile, saveAvatar } = useProfileInfo()

    useEffect(() => {
        setNewUsername(username)
    }, [username])

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
                    style={styles.container}
                    behavior='height'
                    dataSet={{ media: ids.container }}
                >
                    <View style={styles.profilePictureContainer}>
                        <StyledAvatar
                            username={username}
                            image={newAvatar || avatar}
                            size={80}
                            borderWidth={6}
                            style={[styles.avatar, { borderColor: colors.onPrimary }]}
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
                            style={{ borderColor: colors.primary }}
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
                            style={{ borderColor: colors.primary }}
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

const { styles, ids } = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        "@media only screen and (min-width: 640px)": {
            width: "60%",
            alignSelf: "center",
        }
    },
    profilePictureContainer: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 20
    },
    avatar: {
        marginRight: 5
    },
    inputContainer: {
        marginTop: 30,
        marginHorizontal: 10,
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