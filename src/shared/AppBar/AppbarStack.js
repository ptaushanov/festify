import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';

const AppbarStack = ({ route }) => {
    const navigation = useNavigation();
    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={navigation.goBack} />
            <Appbar.Content
                title={i18n.t(route.name)}
                style={styles.content}
            />
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({

})

export default AppbarStack