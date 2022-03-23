import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, SugnUpScreen } from "../screens"
import BottomNavigation from './BottomNavigation';
import AppbarSignUp from '../screens/Signup/AppbarSignUp';

const { Navigator, Screen } = createStackNavigator()

export default function LoginStack() {
    return (
        <Navigator
            initialRouteName="Login"
        >
            <Screen
                name="SignUp"
                component={SugnUpScreen}
                options={{
                    headerMode: "screen",
                    header: () => {
                        return <AppbarSignUp />
                    }
                }}
            />
            <Screen
                name="Login"
                component={LoginScreen}
                options={{
                    header: () => null
                }}
            />
            <Screen
                name="BottomNavigation"
                component={BottomNavigation}
                options={{
                    header: () => null
                }}
            />
        </Navigator>
    )
}