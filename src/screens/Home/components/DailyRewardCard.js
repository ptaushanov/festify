import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { useTheme, Surface, Text, TouchableRipple } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import i18n from 'i18n-js';

const DailyRewardCard = ({ onRewardClaim, rewardAmount = 0 }) => {
    const scaleValue = useRef(new Animated.Value(0)).current;
    const { colors } = useTheme();

    const startAnimation = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const exitAnimation = () => {
        Animated.timing(scaleValue, {
            toValue: 0,
            duration: 300,
            delay: 1500,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => { startAnimation() }, []);

    const handleRewardClaim = () => {
        onRewardClaim();
        exitAnimation();
    };

    return (
        <TouchableRipple
            borderless
            centered
            style={styles.ripple}
            onPress={handleRewardClaim}
        >
            <Animated.View
                style={{ transform: [{ scale: scaleValue }] }}
            >
                <Surface style={styles.surface} elevation={2}>
                    {rewardAmount > 0 ? (
                        <Text style={[styles.reward, { color: colors.xp }]}>
                            {rewardAmount} XP
                        </Text>
                    ) : (
                        <AntDesign name="star" size={60} color={colors.xp} />
                    )}
                    <Text style={styles.text}>{i18n.t('home:Daily Reward')}</Text>
                </Surface>
            </Animated.View>
        </TouchableRipple>
    );
};

export default DailyRewardCard;

const styles = StyleSheet.create({
    surface: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        paddingVertical: 8,
    },
    ripple: {
        borderRadius: 16,
    },
    reward: {
        fontSize: 26,
        paddingVertical: 10,
        fontWeight: 'bold',
    },
});
