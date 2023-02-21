import React from 'react';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';

const AppbarSignUp = () => {
    const navigation = useNavigation();

    const handleBackPressed = () => {
        navigation.goBack();
    }

    return (
        <Appbar.Header elevated>
            <Appbar.BackAction onPress={handleBackPressed} />
            <Appbar.Content
                title={i18n.t("auth:Login")}
            />
        </Appbar.Header>
    );
};

export default AppbarSignUp