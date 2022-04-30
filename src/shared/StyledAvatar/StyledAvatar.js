import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Avatar, useTheme } from 'react-native-paper'

const StyledAvatar = ({ username = "", image, size = 60, borderWidth = 4, style = null }) => {
    const { colors } = useTheme()

    return (
        <View>
            {image ?
                (<View style={[{
                    borderColor: colors.surface,
                    borderWidth: borderWidth,
                }, styles.avatar, style]} >
                    <Avatar.Image size={size} source={{ uri: image }} />
                </View>) :

                (<View style={[{
                    borderColor: colors.surface,
                    borderWidth: borderWidth,
                }, styles.avatar, style]} >
                    <Avatar.Text
                        size={size}
                        label={username.substring(0, 2).toUpperCase()}
                    />
                </View>)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        elevation: 2,
        borderRadius: 100
    }
})

export default StyledAvatar