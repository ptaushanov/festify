import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import HomeScreen from "../screens/Home/HomeScreen"
import LessonsScreen from "../screens/Lessons/LessonsScreen"

const { Navigator, Screen } = createMaterialBottomTabNavigator()
import { palette } from "../themes/palette"

export default function HomeBottomNav() {
    return (
        <Navigator
            initialRouteName="Home"
            shifting={true}
            sceneAnimationEnabled={false}
            backBehavior="firstRoute"
            barStyle={{ backgroundColor: palette.primary }}
        >
            <Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: "home"
                }}
            />

            <Screen
                name="Lessons"
                component={LessonsScreen}
                options={{
                    tabBarIcon: "book"
                }}
            />

        </Navigator>
    )
}