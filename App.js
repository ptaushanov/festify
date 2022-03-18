import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import { defaultTheme } from "./src/themes/theme"
import HomeStack from './src/routes/HomeStack';

export default function App() {
  return (
    <PaperProvider theme={defaultTheme}>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </PaperProvider>
  );
}