import { StyleSheet } from 'react-native'
import { List, Switch, Divider, Surface } from 'react-native-paper';
import React from 'react'
import i18n from 'i18n-js';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core'
import { useTheme } from '../../../contexts/ThemeContext';
import { auth } from '../../../../firebase.v9';


const ProfileList = () => {
    const navigation = useNavigation()
    const { toggleTheme, darkMode } = useTheme()

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    const handleNavigateToRewards = () => {
        navigation.navigate("My Collection")
    }

    return (
        <Surface elevation={1} style={styles.surface}>
            <List.Section title={i18n.t("profile:General")} titleStyle={styles.title}>
                <Divider style={styles.divider} />
                <List.Item
                    style={styles.container}
                    title={i18n.t("profile:Dark Mode")}
                    onPress={() => null}
                    left={(props) => <List.Icon {...props} icon={(props) => <Ionicons name="moon" {...props} />} />}
                    right={(props) => <Switch {...props} onValueChange={toggleTheme} value={darkMode} style={styles.switch} />}
                />

                <Divider style={styles.divider} />

                <List.Item
                    style={styles.container}
                    title={i18n.t("profile:My Rewards")}
                    left={(props) => <List.Icon {...props} icon={"trophy-award"} />}
                    onPress={handleNavigateToRewards}
                />

                <Divider style={styles.divider} />

                <List.Item
                    style={styles.container}
                    title={i18n.t("profile:Logout")}
                    left={(props) => <List.Icon {...props} icon={"logout"} />}
                    onPress={handleSignOut}
                />
            </List.Section>
        </Surface>


    )
}

export default ProfileList

const styles = StyleSheet.create({
    surface: {
        marginTop: 60,
        borderRadius: 16
    },
    listItem: {
        padding: 0,
    },
    divider: {
        height: 1
    },
    container: {
        paddingHorizontal: 20
    },
    title: {
        paddingLeft: 20
    },
    switch: {
        height: 20,
        alignSelf: "center"
    }
})