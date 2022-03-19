import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { StatusBar } from 'expo-status-bar';

export default function ThemeWrapper({ children }) {
    const { currentTheme, darkMode } = useTheme()

    return (
        <PaperProvider theme={currentTheme}>
            <NavigationContainer theme={currentTheme}>
                <StatusBar style={darkMode ? "light" : "dark"} />
                {children}
            </NavigationContainer>
        </PaperProvider >
    )
}