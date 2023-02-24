import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { HomeStack, LessonsStack, LeaderboardStack, ProfileStack } from "../routes"
import { Ionicons } from '@expo/vector-icons';

const { Navigator, Screen } = createMaterialBottomTabNavigator()
import i18n from 'i18n-js';

export default function BottomNavigation() {
    const btnIconSize = 24;

    const generateIcon = (size, icon, iconOutline) => ({ focused, color }) => (
        <Ionicons
            name={focused ? icon : iconOutline}
            size={size}
            color={color}
        />
    )

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
                    tabBarIcon: generateIcon(btnIconSize, "home", "home-outline"),
                    title: i18n.t("Home")
                }}
            />

            <Screen
                name="LessonsStack"
                component={LessonsStack}
                options={{
                    tabBarIcon: generateIcon(btnIconSize, "book", "book-outline"),
                    title: i18n.t("Lessons")
                }}
            />

            <Screen
                name="LeaderboardStack"
                component={LeaderboardStack}
                options={{
                    tabBarIcon: generateIcon(btnIconSize, "trophy", "trophy-outline"),
                    title: i18n.t("Leaderboard")
                }}
            />

            <Screen
                name="ProfileStack"
                component={ProfileStack}
                options={{
                    tabBarIcon: generateIcon(btnIconSize, "person", "person-outline"),
                    title: i18n.t("Profile")
                }}
            />

        </Navigator>
    )
}