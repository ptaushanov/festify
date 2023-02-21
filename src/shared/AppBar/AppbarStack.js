import React from 'react';
import { Appbar } from 'react-native-paper';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';

const AppbarStack = ({ route }) => {
    const navigation = useNavigation();
    return (
        <Appbar.Header elevated>
            <Appbar.BackAction onPress={navigation.goBack} />
            <Appbar.Content
                title={i18n.t(route.params?.appBarTitle || route.name)}
            />
        </Appbar.Header>
    );
};

export default AppbarStack