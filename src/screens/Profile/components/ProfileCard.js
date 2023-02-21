import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Surface, Text, IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

import StyledAvatar from '../../../shared/StyledAvatar/StyledAvatar'
import { useProfileInfo } from '../../../contexts/ProfileContext'
import { useTheme } from 'react-native-paper'

const ProfileCard = () => {
    const navigation = useNavigation()
    const { username, email, avatar } = useProfileInfo();
    const { colors } = useTheme()

    const handleInfoEdit = () => {
        navigation.navigate("Edit Profile")
    }

    const themedStyles = {
        borderColor: colors.onPrimary
    }

    return (
        <Surface style={styles.surface} elevation={2}>
            <StyledAvatar
                style={[styles.avatar, themedStyles]}
                size={70}
                image={avatar}
                username={username}
                borderWidth={6}
            />
            <IconButton
                icon="circle-edit-outline"
                size={20}
                onPress={handleInfoEdit}
                style={styles.edit}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>

        </Surface>
    )
}

export default ProfileCard

const styles = StyleSheet.create({
    surface: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 25,
        borderRadius: 6
    },
    avatar: {
        marginTop: -45,
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