import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen, ProfileEditScreen } from "../screens"
import AppbarStack from '../shared/AppBar/AppbarStack';
import AppbarMain from '../shared/AppBar/AppbarMain';
import { ProfileProvider } from "../contexts/ProfileContext"

const { Navigator, Screen } = createStackNavigator()

export default function ProfileStack() {
    return (
        <ProfileProvider>
            <Navigator
                initialRouteName="Profile"
                screenOptions={{
                    headerMode: "screen",
                    header: ({ route }) => {
                        return <AppbarStack route={route} />
                    },
                }}
            >
                <Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        headerMode: "screen",
                        header: ({ route }) => {
                            return <AppbarMain route={route} />
                        },
                    }}
                />

                <Screen
                    name="Edit Profile"
                    component={ProfileEditScreen}
                />
            </Navigator>
        </ProfileProvider>

    )
}