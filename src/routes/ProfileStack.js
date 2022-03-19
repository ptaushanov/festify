import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from "../screens"
import AppbarMain from '../shared/AppBar/AppbarMain';

const { Navigator, Screen } = createStackNavigator()

export default function ProfileStack() {
    return (
        <Navigator
            initialRouteName="Profile"
            screenOptions={{
                headerMode: "screen",
                header: ({ route }) => {
                    return <AppbarMain route={route} />
                },
            }}
        >
            <Screen
                name="Profile"
                component={ProfileScreen}
            />
        </Navigator>
    )
}