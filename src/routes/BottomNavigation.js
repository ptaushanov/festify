import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { HomeStack, LessonsStack, LeaderboardStack, ProfileStack } from "../routes"

const { Navigator, Screen } = createMaterialBottomTabNavigator()
import i18n from 'i18n-js';

export default function BottomNavigation() {
    return (
        <Navigator
            initialRouteName="HomeStack"
            shifting={true}
            sceneAnimationEnabled={false}
            backBehavior="firstRoute"
            compact

        >
            <Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    tabBarIcon: "home",
                    title: i18n.t("Home")
                }}
            />

            <Screen
                name="LessonsStack"
                component={LessonsStack}
                options={{
                    tabBarIcon: "book",
                    title: i18n.t("Lessons")
                }}
            />

            <Screen
                name="LeaderboardStack"
                component={LeaderboardStack}
                options={{
                    tabBarIcon: "trophy",
                    title: i18n.t("Leaderboard")
                }}
            />

            <Screen
                name="ProfileStack"
                component={ProfileStack}
                options={{
                    tabBarIcon: "account",
                    title: i18n.t("Profile")
                }}
            />

        </Navigator>
    )
}