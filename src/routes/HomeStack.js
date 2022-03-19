import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from "../screens"
import AppbarMain from '../shared/AppBar/AppbarMain';

const { Navigator, Screen } = createStackNavigator()

export default function HomeStack() {
    return (
        <Navigator
            initialRouteName="Home"
            screenOptions={{
                headerMode: "screen",
                header: ({ route }) => {
                    return <AppbarMain route={route} />
                },
            }}
        >
            <Screen
                name="Home"
                component={HomeScreen}
            />
        </Navigator>
    )
}