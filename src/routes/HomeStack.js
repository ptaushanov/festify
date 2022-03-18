import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../screens/Login/LoginScreen"
import HomeBottomNav from './HomeBottomNav';

const { Navigator, Screen } = createStackNavigator()

export default function HomeStack() {
    return (
        <Navigator>
            <Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerShown: false
                }}
            />
            <Screen
                name="HomeStack"
                component={HomeBottomNav}
                options={{
                    headerShown: false,
                }}
            />
        </Navigator>
    )
}