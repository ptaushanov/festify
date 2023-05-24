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
                    <Text key={index} style={styles.text} dataSet={{ media: ids.text }}>
                        {item.value}
                    </Text>
                )
            case "image":
                return (
                    <View key={index} style={styles.imageContainer} dataSet={{ media: ids.imageContainer }}>
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
            alignItems: 'center',
        }
    },
    imageContainer: {
        marginVertical: 10,
        height: Platform.OS == "web" ?
            "30vh" :
            Math.round(Dimensions.get("window").width * 9 / 16),
        "@media only screen and (min-width: 640px)": {
            flex: 1,
            minWidth: "49%",
            height: "50vh",
            maxHeight: "50vh",
            paddingHorizontal: 20
        }
    },
    image: {
        borderRadius: 4,
        width: '100%',
        height: '100%',
    },
    text: {
        flex: 1,
        minWidth: "51%",
        fontSize: 16,
        lineHeight: 20,
        paddingVertical: 10,
        textAlign: "justify",
        "@media only screen and (min-width: 640px)": {
            fontSize: 18,
            lineHeight: 25,
        }
    }
})
