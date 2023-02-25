import React from 'react'
import { StyleSheet } from 'react-native'
import { Dialog, Portal, List } from "react-native-paper"
import i18n from 'i18n-js'
import { useLanguage } from '../../../contexts/LanguageContext'

const LanguagePicker = ({ open, setOpen, onLanguageChange }) => {
    const { systemLocale } = useLanguage()
    const hideDialog = () => setOpen(false)
    const handleOnPress = (locale) => () => {
        onLanguageChange(locale)
        hideDialog()
    }

    return (
        <Portal>
            <Dialog style={styles.dialog} visible={open} onDismiss={hideDialog}>
                <Dialog.Title>{i18n.t("profile:Select language")}</Dialog.Title>
                <Dialog.Content>
                    <List.Item
                        titleStyle={styles.listItem}
                        title={`🌐  ${i18n.t("profile:System")} (${systemLocale})`}
                        onPress={handleOnPress("system")}
                    />
                    <List.Item
                        titleStyle={styles.listItem}
                        title="🇺🇸  English (en-US)"
                        onPress={handleOnPress("en-US")}
                    />
                    <List.Item
                        titleStyle={styles.listItem}
                        title="🇧🇬  Български (bg-BG)"
                        onPress={handleOnPress("bg")}
                    />
                </Dialog.Content>
            </Dialog>
        </Portal>
    )
}

const styles = StyleSheet.create({
    dialog: {
        borderRadius: 20
    },
    listItem: {
        fontSize: 18
    }
})

export default LanguagePicker