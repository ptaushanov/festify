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
        borderColor: colors.surfaceCard
    }

    return (
        <Surface style={styles.surface}>
            <StyledAvatar
                style={[styles.avatar, themedStyles]}
                size={65}
                image={avatar}
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
                <Text style={styles.email}>{email}</Text>
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