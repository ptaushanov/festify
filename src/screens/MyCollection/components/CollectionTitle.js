import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import i18n from 'i18n-js'

const CollectionTitle = () => {
    return (
        <View>
            <Text style={styles.title}>
                {i18n.t("My Collection")}
            </Text>
        </View>
    )
}

export default CollectionTitle

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20
    }
})