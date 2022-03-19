import { createStackNavigator } from '@react-navigation/stack';
import { LeaderboardScreen } from "../screens"
import AppbarMain from '../shared/AppBar/AppbarMain';

const { Navigator, Screen } = createStackNavigator()

export default function LeaderboardStack() {
    return (
        <Navigator
            initialRouteName="Leaderboard"
            screenOptions={{
                headerMode: "screen",
                header: ({ route }) => {
                    return <AppbarMain route={route} />
                },
            }}
        >
            <Screen
                name="Leaderboard"
                component={LeaderboardScreen}
            />
        </Navigator>
    )
}