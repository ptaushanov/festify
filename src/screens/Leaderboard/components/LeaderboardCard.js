import { StyleSheet, View } from 'react-native'
import React from 'react'
import StyledAvatar from '../../../shared/StyledAvatar/StyledAvatar'
import { Surface, useTheme, Text } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LeaderboardCard = ({
    avatar,
    username = "",
    xp = 0,
    place = 0
}) => {
    const { colors } = useTheme();

    const medalColors = [
        colors.gold,
        colors.silver,
        colors.bronze
    ]

    return (
        <Surface style={styles.surfaceContainer} elevation={1}>
            <View style={styles.content}>
                <StyledAvatar
                    size={50}
                    username={username}
                    image={avatar}
                    style={[
                        { borderColor: colors.surface },
                        styles.styledAvatar
                    ]}
                />
                <View style={styles.contentText}>
                    <Text style={styles.username}>{username}</Text>
                    <Text style={styles.xp}>{xp} XP</Text>
                </View>
                <View style={styles.contentPlace}>
                    {place && place < 4
                        ? <MaterialCommunityIcons
                            name="medal"
                            size={24}
                            color={medalColors[place - 1]}
                        /> : null
                    }
                    {place ? <Text style={styles.placeText}>{place}</Text> : null}
                </View>
            </View>
        </Surface>
    )
}

export default LeaderboardCard

const styles = StyleSheet.create({
    surfaceContainer: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 10,
        marginVertical: 5
    },
    content: {
        flexDirection: "row"
    },
    contentText: {
        justifyContent: "center",
        paddingHorizontal: 20
    },
    username: {
        fontSize: 20
    },
    xp: {
        fontSize: 14
    },
    contentPlace: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    placeText: {
        fontSize: 20,
        fontWeight: "600",
        paddingHorizontal: 5
    }
})