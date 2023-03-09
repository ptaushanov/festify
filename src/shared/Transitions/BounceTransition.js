import React from 'react'
import { animated, useTransition } from '@react-spring/native'

const BounceTransition = ({ delay = 0, children }) => {
    const transitions = useTransition(children, {
        scale: 0,
        delay: delay,
        from: { scale: 0 },
        enter: { scale: 1 },
        leave: { scale: 0 },
        config: {
            mass: 1,
            tension: 200,
            friction: 15
        },
        exitBeforeEnter: true
    })


    return transitions((springConfig, child) => {
        const springStyle = { transform: [{ scale: springConfig.scale }] }
        return <animated.View style={springStyle}>{child}</animated.View>
    })
}

export default BounceTransition