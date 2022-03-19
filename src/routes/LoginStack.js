import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from "../screens"
import BottomNavigation from './BottomNavigation';

const { Navigator, Screen } = createStackNavigator()

export default function LoginStack() {
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
                name="BottomNavigation"
                component={BottomNavigation}
                options={{
                    headerShown: false,
                }}
            />
        </Navigator>
    )
}