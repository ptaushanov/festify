import React from 'react';
import { Appbar } from 'react-native-paper';
import i18n from 'i18n-js';

const AppbarMain = ({ route }) => {
    return (
        <Appbar.Header elevated mode="center-aligned">
            <Appbar.Content
                title={i18n.t(route.name)}
            />
        </Appbar.Header>
    );
};

export default AppbarMain