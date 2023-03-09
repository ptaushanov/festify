import React from 'react'
import { animated, useSpring } from '@react-spring/native'

const BounceView = ({ delay = 0, children }) => {
    const springConfig = useSpring({
        scale: 1,
        delay: delay,
        from: {
            scale: 0
        },
        to: {
            scale: 1
        },
        config: {
            mass: 1,
            tension: 200,
            friction: 15
        }
    })

    const springStyle = { transform: [{ scale: springConfig.scale }] }

    return (
        <animated.View style={springStyle}>
            {children}
        </animated.View>
    )
}

export default BounceView