import { createStackNavigator } from '@react-navigation/stack';
import { LessonsScreen, LessonsTimeline, LessonMain } from "../screens"
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
                    component={LessonsScreen}
                    options={{
                        headerMode: "screen",
                        header: ({ route }) => {
                            return <AppbarMain route={route} />
                        },
                    }}
                />
                <Screen
                    name="Spring Timeline"
                    component={LessonsTimeline}
                    initialParams={{
                        forSeason: "spring",
                        title: "Spring holidays"
                    }}
                />
                <Screen
                    name="Summer Timeline"
                    component={LessonsTimeline}
                    initialParams={{
                        forSeason: "summer",
                        title: "Summer holidays"
                    }}
                />
                <Screen
                    name="Autumn Timeline"
                    component={LessonsTimeline}
                    initialParams={{
                        forSeason: "autumn",
                        title: "Autumn holidays"
                    }}
                />
                <Screen
                    name="Winter Timeline"
                    component={LessonsTimeline}
                    initialParams={{
                        forSeason: "winter",
                        title: "Winter holidays"
                    }}
                />
                <Screen
                    name="Lesson Main"
                    component={LessonMain}
                    initialParams={{
                        forSeason: "winter",
                        title: "Winter holidays"
                    }}
                    options={{
                        header: () => null
                    }}
                />
            </Navigator>
        </LessonsProvider>
    )
}