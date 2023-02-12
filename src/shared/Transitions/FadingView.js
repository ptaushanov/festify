import { Animated, Platform } from 'react-native'
import React, { useRef, useEffect } from 'react'

const FadingView = ({
    children,
    style,
    fadeInDuration,
    pauseDuration,
    fadeoutDuration,
    visible = false,
    onAnimationEnd
}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current
    const isMobile = Platform.OS === 'ios' || Platform.OS === 'android'

    useEffect(() => {
        if (visible) {
            Animated.sequence([
                Animated.timing(
                    fadeAnim,
                    {
                        toValue: 1,
                        duration: fadeInDuration,
                        useNativeDriver: isMobile
                    }
                ),
                Animated.delay(pauseDuration),
                Animated.timing(
                    fadeAnim,
                    {
                        toValue: 0,
                        duration: fadeoutDuration,
                        useNativeDriver: isMobile
                    }
                )
            ]).start((({ finished }) => {
                finished && onAnimationEnd()
            }))
        }
    }, [visible])

    return (
        <Animated.View
            style={{
                ...style,
                opacity: fadeAnim,
            }}
        >
            {children}
        </Animated.View>
    );
}

export default FadingView;