import { createStackNavigator } from '@react-navigation/stack';
import { SeasonsScreen, LessonsTimeline, LessonScreen } from "../screens"
import AppbarMain from '../shared/AppBar/AppbarMain';
import AppbarStack from '../shared/AppBar/AppbarStack';

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
                        return <AppbarStack route={route} />
                    },
                }}
            >
                <Screen
                    name="Lessons"
                    component={SeasonsScreen}
                    options={{
                        headerMode: "screen",
                        header: ({ route }) => {
                            return <AppbarMain route={route} />
                        },
                    }}
                />
                <Screen
                    name="Season Timeline"
                    component={LessonsTimeline}
                />
                <Screen
                    name="Lesson Main"
                    component={LessonScreen}
                    options={{
                        header: () => null
                    }}
                />
            </Navigator>
        </LessonsProvider>
    )
}