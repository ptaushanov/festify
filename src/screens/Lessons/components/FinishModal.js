import React from 'react'
import { View, Modal, StyleSheet } from 'react-native'

import { useLessonsInfo } from '../../../contexts/LessonsContext'
import Button from '../../../shared/Button/Button'
import globalStyles from '../../../styles/global'
import { useTheme, Headline, Text, Subheading } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import i18n from 'i18n-js'

const FinishModal = () => {
    const {
        lessonData,
        lessonFinished,
        completeLesson,
    } = useLessonsInfo()

    const { colors } = useTheme()
    const navigation = useNavigation()

    const handleContinuePress = async () => {
        await completeLesson()
        navigation.goBack()
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
                        <Headline style={styles.headline}>
                            🎉 {i18n.t("lessons:Congratulations")} 🎉
                        </Headline>
                        <Subheading style={styles.subheading}>
                            {i18n.t("lessons:On learning the holiday") +
                                " " + lessonData.holiday_name}
                        </Subheading>
                        <Text style={styles.rewardText}>
                            {i18n.t("lessons:Reward")}
                        </Text>
                        <View style={styles.rewardContainer}>
                            <Text style={styles.rewardXP}>
                                {lessonData.xp_reward || 0}
                            </Text>
                            <AntDesign name="star" size={24} color={colors.xp} />
                        </View>
                        <View style={styles.additionalReward}>
                            <Text style={{ fontSize: 30, textAlign: "center" }}>X</Text>
                        </View>
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
        fontSize: 34
    },
    subheading: {
        textAlign: "center",
        marginVertical: 20,
        lineHeight: 30,
        fontSize: 22,
        paddingHorizontal: 40
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
        marginBottom: 20
    }
})