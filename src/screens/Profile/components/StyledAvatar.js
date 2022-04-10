import { View } from 'react-native'
import React from 'react'
import { Avatar, useTheme } from 'react-native-paper'

const StyledAvatar = ({ username = "", image, size = 70, borderWidth = 4, style = null }) => {
    const { colors } = useTheme()

    return (
        <View>
            {image ?
                (<Avatar.Image size={size} source={{ uri: image }}
                    style={style} />) :

                (<Avatar.Text
                    size={size}
                    label={username.substring(0, 2).toUpperCase()}
                    style={[style, {
                        borderColor: colors.surface,
                        borderWidth: borderWidth
                    }]}
                />)
            }
        </View>
    )
}

export default StyledAvatar