import React from 'react';
import { Appbar } from 'react-native-paper';
import i18n from 'i18n-js';

const AppbarMain = ({ route }) => {
    return (
        <Appbar.Header>
            <Appbar.Content title={i18n.t(route.name)} />
            <Appbar.Action icon="account" onPress={() => { }} />
        </Appbar.Header>
    );
};

export default AppbarMain