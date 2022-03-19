import React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import profile from "../../assets/images/avatar.png"
import i18n from 'i18n-js';

const AppbarMain = ({ route }) => {
    return (
        <Appbar.Header>
            <Appbar.Content title={i18n.t(route.name)} />
            {/* <Appbar.Action icon="account" /> */}
            <Avatar.Image source={profile} size={35} style={{ marginRight: 10 }} />
        </Appbar.Header>
    );
};

export default AppbarMain