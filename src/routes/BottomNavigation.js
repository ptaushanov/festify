import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { HomeScreen, LessonsScreen, LeaderboardScreen, ProfileScreen } from "../screens"

const { Navigator, Screen } = createMaterialBottomTabNavigator()
import i18n from 'i18n-js';

export default function BottomNavigation() {
    return (
        <Navigator
            initialRouteName="Home"
            shifting={true}
            sceneAnimationEnabled={false}
            backBehavior="firstRoute"
        >
            <Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: "home",
                    title: i18n.t("Home")
                }}
            />

            <Screen
                name="Lessons"
                component={LessonsScreen}
                options={{
                    tabBarIcon: "book",
                    title: i18n.t("Lessons")
                }}
            />

            <Screen
                name="Leaderboard"
                component={LeaderboardScreen}
                options={{
                    tabBarIcon: "trophy",
                    title: i18n.t("Leaderboard")
                }}
            />

            <Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: "account",
                    title: i18n.t("Profile")
                }}
            />

        </Navigator>
    )
}