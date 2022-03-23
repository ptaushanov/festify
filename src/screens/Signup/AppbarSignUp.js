import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { StyleSheet } from 'react-native';

const AppbarSignUp = () => {
    const navigation = useNavigation();

    const handleBackPressed = () => {
        navigation.goBack();
    }

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={handleBackPressed} />
            <Appbar.Content
                title={i18n.t("auth:Login")}
                titleStyle={styles.title}
            />
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        marginLeft: -20
    }
})

export default AppbarSignUp