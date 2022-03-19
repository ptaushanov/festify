import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from "../screens"
import BottomNavigation from './BottomNavigation';

const { Navigator, Screen } = createStackNavigator()

export default function LoginStack() {
    return (
        <Navigator
            initialRouteName="Login"
            screenOptions={{
                header: () => null
            }}
        >
            <Screen
                name="Login"
                component={LoginScreen}

            />
            <Screen
                name="BottomNavigation"
                component={BottomNavigation}
            />
        </Navigator>
    )
}