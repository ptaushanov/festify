import { StyleSheet, View } from 'react-native'
import React from 'react'

import Button from '../../../shared/Button/Button'
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';

import { useTheme } from 'react-native-paper';
import i18n from 'i18n-js';

const LessonNavigation = ({ actionButtonText, onActionButtonPress, onBackButtonPress }) => {
    const { colors } = useTheme()

    const themedStyles = {
        borderTopColor: colors.divider,
        backgroundColor: colors.surface
    }

    return (
        <View style={[
            styles.navigationContainer,
            themedStyles
        ]}>
            <IconButton
                icon={(props) => (
                    <Ionicons
                        name="caret-back-circle"
                        {...props}
                        color={colors.accent}
                    />
                )}
                size={35}
                style={styles.backButton}
                onPress={onBackButtonPress}
            />
            <Button
                mode="contained"
                size={2}
                style={styles.actionButton}
                onPress={onActionButtonPress}
            >
                {i18n.t("lessons:" + actionButtonText)}
            </Button>
        </View>
    )
}

export default LessonNavigation

const styles = StyleSheet.create({
    navigationContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth: 1,
        paddingVertical: 2
    },
    backButton: {
        margin: 0,
        marginLeft: 20
    },
    actionButton: {
        alignSelf: "flex-end",
        marginRight: 20
    },

})