import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import i18n from 'i18n-js';

const AppbarMain = ({ route }) => {
    return (
        <Appbar.Header>
            <Appbar.Content
                title={i18n.t(route.name)}
                style={styles.content}
            />
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    content: {
        alignItems: "center",
    }
})

export default AppbarMain