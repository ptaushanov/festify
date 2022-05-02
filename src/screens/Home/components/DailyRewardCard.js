import { StyleSheet } from 'react-native'
import React from 'react'
import { useTheme, Surface, Text, TouchableRipple } from 'react-native-paper'
import Animated, { ZoomIn, BounceOut } from 'react-native-reanimated'
import { AntDesign } from '@expo/vector-icons';
import i18n from 'i18n-js'

const DailyRewardCard = ({ onRewardClaim, rewardAmount = 0 }) => {
    const { colors } = useTheme()

    return (
        <Animated.View
            entering={ZoomIn.springify().springify().damping(10)}
            exiting={BounceOut}
        >
            <TouchableRipple
                borderless
                centered
                style={styles.ripple}
                onPress={onRewardClaim}
            >
                <Surface style={styles.surface}>
                    {rewardAmount > 0 ? (
                        <Text style={[styles.reward, { color: colors.xp }]}>
                            {rewardAmount} XP
                        </Text>
                    ) : (
                        <AntDesign name="star" size={60} color={colors.xp} />
                    )}
                    <Text style={styles.text}>{i18n.t("home:Daily Reward")}</Text>
                </Surface>
            </TouchableRipple>
        </Animated.View>
    )
}

export default DailyRewardCard

const styles = StyleSheet.create({
    surface: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        paddingVertical: 8,
    },
    ripple: {
        borderRadius: 10,
        elevation: 2
    },
    reward: {
        fontSize: 26,
        paddingVertical: 10,
        fontWeight: "bold"
    }
})