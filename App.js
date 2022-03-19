import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import HomeStack from './src/routes/HomeStack';
import { useContext } from 'react';
import ThemeContext from './src/contexts/ThemeContext';

export default function App() {
  const { currentTheme } = useContext(ThemeContext)
  return (
    <PaperProvider theme={currentTheme}>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </PaperProvider>
  );
}