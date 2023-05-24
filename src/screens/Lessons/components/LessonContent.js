import React from 'react'
import StyleSheet from "react-native-media-query"
import { View, Image, ScrollView } from 'react-native'
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
                return (
                    <View key={index} style={styles.imageContainer}>
                        <Image
                            source={{ uri: item.value }}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                )
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.lessonContainer} dataSet={{ media: ids.lessonContainer }}>
                {title && <LessonTitle title={title} />}

                <View style={styles.contentContainer} dataSet={{ media: ids.contentContainer }}>
                    {content && content.map((item, index) => (
                        constructComponent(item, index)
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}

export default LessonContent

const { styles, ids } = StyleSheet.create({
    lessonContainer: {
        paddingHorizontal: 30,
        paddingTop: 10,
        flex: 1,
        "@media only screen and (min-width: 640px)": {
            paddingHorizontal: "10%",
        }
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        "@media only screen and (min-width: 640px)": {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            gap: 20
        }
    },
    imageContainer: {
        flex: 1,
        width: "100%",
        maxHeight: "50vh",
        marginVertical: 10,
    },
    image: {
        flex: 1,
        borderRadius: 4,
        width: '100%',
        height: '100%',
    },
    text: {
        flex: 1,
        fontSize: 16,
        lineHeight: 20,
        paddingVertical: 10,
        textAlign: "justify",
    }
})
