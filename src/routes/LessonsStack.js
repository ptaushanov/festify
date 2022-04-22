import { createStackNavigator } from '@react-navigation/stack';
import { LessonsScreen } from "../screens"
import AppbarMain from '../shared/AppBar/AppbarMain';

const { Navigator, Screen } = createStackNavigator()
import { LessonsProvider } from '../contexts/LessonsContext';

export default function LessonsStack() {
    return (
        <LessonsProvider>
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
        </LessonsProvider>
    )
}