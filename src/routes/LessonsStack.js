import { createStackNavigator } from '@react-navigation/stack';
import { LessonsScreen } from "../screens"
import AppbarMain from '../shared/AppBar/AppbarMain';

const { Navigator, Screen } = createStackNavigator()

export default function LessonsStack() {
    return (
        <Navigator
            initialRouteName="Lessons"
            screenOptions={{
                headerMode: "screen",
                header: ({ route }) => {
                    return <AppbarMain route={route} />
                },
            }}
        >
            <Screen
                name="Lessons"
                component={LessonsScreen}
            />
        </Navigator>
    )
}