import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Surface, Avatar, useTheme, Text, IconButton } from 'react-native-paper'
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native'

const ProfileCard = ({ username = "", email = "", image }) => {
    const { colors } = useTheme()
    const navigation = useNavigation()

    const handleInfoEdit = () => {
        navigation.navigate("Edit Profile")
    }

    return (
        <Surface style={styles.surface}>
            {image ?
                <Avatar.Image size={70} source={image} style={styles.avatar} /> :
                <Avatar.Text
                    size={70}
                    label={username.substring(0, 2).toUpperCase()}
                    style={[styles.avatar, {
                        borderColor: colors.surface,
                        borderWidth: 4
                    }]}
                />
            }
            <IconButton
                // icon={(props) => (<MaterialIcons icon="edit" {...props} />)}
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