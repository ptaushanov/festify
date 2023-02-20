import React from 'react'
import { View, Modal, StyleSheet, Image } from 'react-native'

import { useLessonsInfo } from '../../../contexts/LessonsContext'
import Button from '../../../shared/Button/Button'
import globalStyles from '../../../styles/global'
import { useTheme, Text } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import i18n from 'i18n-js'
import noImage from "../../../assets/images/no_image.jpg"

const FinishModal = () => {
    const {
        lessonData,
        lessonFinished,
        completeLesson,
        rewardData
    } = useLessonsInfo()

    const { colors } = useTheme()
    const navigation = useNavigation()

    const handleContinuePress = async () => {
        await completeLesson()
        navigation.goBack()
    }

    const getRewardThumbnail = () => {
        return rewardData.thumbnail ?
            { uri: rewardData.thumbnail } : noImage
    }

    return (
        <Modal animationType="fade" visible={lessonFinished}>
            <View style={{ backgroundColor: colors.surface, flex: 1 }}>
                <View style={[
                    globalStyles.container,
                    styles.contentContainer,
                    { backgroundColor: colors.surface, borderColor: colors.primary }
                ]}>
                    <View>
                        <Text variant="headlineSmall" style={styles.headline}>
                            🎉 {i18n.t("lessons:Congratulations")} 🎉
                        </Text>
                        <Text variant="titleMedium" style={styles.subheading}>
                            {i18n.t("lessons:On learning the holiday") +
                                " " + lessonData.holiday_name}
                        </Text>
                        <Text style={styles.rewardText}>
                            {i18n.t("lessons:Reward")}
                        </Text>
                        <View style={styles.rewardContainer}>
                            <Text style={styles.rewardXP}>
                                {lessonData.xp_reward || 0}
                            </Text>
                            <AntDesign name="star" size={24} color={colors.xp} />
                        </View>
                        {rewardData ?
                            <View style={styles.additionalReward}>
                                <Image
                                    source={getRewardThumbnail()}
                                    style={styles.rewardImage}
                                    resizeMode="contain"
                                />
                                <Text style={styles.additionalRewardText}>
                                    {rewardData.name}
                                </Text>
                            </View> : null
                        }
                        <Button
                            onPress={handleContinuePress}
                            mode="contained"
                        >
                            {i18n.t("lessons:Continue")}
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default FinishModal

const styles = StyleSheet.create({
    contentContainer: {
        borderWidth: 4,
        margin: 6,
        borderStyle: "dashed",
        borderRadius: 1
    },
    headline: {
        textAlign: "center",
        fontSize: 32
    },
    subheading: {
        textAlign: "center",
        marginVertical: 20,
        lineHeight: 30,
        fontSize: 22,
        paddingHorizontal: 35
    },
    rewardText: {
        fontSize: 28,
        textAlign: "center",
        marginTop: 30,
    },
    rewardContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10
    },
    rewardXP: {
        fontSize: 24,
        paddingHorizontal: 4
    },
    additionalReward: {
        marginBottom: 20,
        alignItems: "center"
    },
    rewardImage: {
        width: 120,
        height: 120,
    },
    additionalRewardText: {
        fontSize: 18
    }
})