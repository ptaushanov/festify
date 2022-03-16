import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../screens/Login/LoginScreen"
import HomeScreen from "../screens/Home/HomeScreen"

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
                name="Home"
                component={LoginScreen}
            />
        </Navigator>
    )
}