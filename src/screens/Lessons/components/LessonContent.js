import React from 'react'
import StyleSheet from "react-native-media-query"
import { View, Image, ScrollView, Dimensions, Platform } from 'react-native'
import { Text } from 'react-native-paper'

import LessonTitle from './LessonTitle'

const LessonContent = ({ title, content }) => {
    const constructComponent = (item, index) => {
        switch (item.type) {
            case "text":
                return (
                    <Text key={index} style={styles.text}>
                        {item.value}
                    </Text>
                )
            case "image":
                const dimensions = Dimensions.get("window")
                const margin_correction = 0.3 * dimensions.width
                const height = Platform.OS === "web" ?
                    Math.round((dimensions.width - margin_correction) * 9 / 16) :
                    Math.round(dimensions.width * 9 / 16)

                return (
                    <Image
                        key={index}
                        source={{ uri: item.value }}
                        resizeMode="contain"
                        style={[styles.image, { height }]}
                    />
                )
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.contentContainer} dataSet={{ media: ids.contentContainer }}>
                {title && <LessonTitle title={title} />}
                {content && content.map((item, index) => (
                    constructComponent(item, index)
                ))}
            </View>
        </ScrollView>
    )
}

export default LessonContent

const { styles, ids } = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 30,
        paddingTop: 10,
        flex: 1,
        "@media only screen and (min-width: 640px)": {
            paddingHorizontal: "20%"
        }
    },
    image: {
        borderRadius: 4,
        marginVertical: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 20,
        paddingVertical: 10,
        textAlign: "justify",
    }
})