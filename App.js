import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import HomeStack from './src/routes/HomeStack';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </PaperProvider>
  );
}