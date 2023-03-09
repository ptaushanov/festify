import React from 'react'
import { Dimensions } from 'react-native'
import { animated, useSpring } from '@react-spring/native'

const SlidingView = ({ delay = 0, direction = "left", children }) => {
    const { width, height } = Dimensions.get("window")

    const edgeValues = {
        left: -width,
        right: width,
        top: -height,
        bottom: height
    }

    const startValue = edgeValues[direction] ?? edgeValues.left

    const springConfig = useSpring({
        position: startValue,
        delay: delay,
        from: { position: startValue },
        to: { position: 0 },
        config: {
            mass: 1,
            tension: 100,
            friction: 15
        }
    })

    const translateProperty =
        direction === "top" || direction === "bottom" ?
            "translateY" :
            "translateX"

    const springStyle = {
        transform: [{ [translateProperty]: springConfig.position }]
    }

    return (
        <animated.View style={springStyle}>
            {children}
        </animated.View>
    )
}

export default SlidingView