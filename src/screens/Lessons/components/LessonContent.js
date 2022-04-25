import { StyleSheet, View, Image, ScrollView, Dimensions } from 'react-native'
import React from 'react'
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
                return (
                    <Image
                        key={index}
                        source={{ uri: item.value }}
                        resizeMode="contain"
                        style={[
                            styles.image,
                            { height: Math.round(dimensions.width * 9 / 16) }
                        ]}
                    />
                )
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.contentContainer}>
                {title && <LessonTitle title={title} />}
                {content && content.map((item, index) => (
                    constructComponent(item, index)
                ))}
            </View>
        </ScrollView>
    )
}

export default LessonContent

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 30,
        paddingTop: 10,
        flex: 1
    },
    image: {
        borderRadius: 4,
    },
    text: {
        fontSize: 16,
        lineHeight: 20,
        paddingVertical: 20,
        textAlign: "justify",
    }
})