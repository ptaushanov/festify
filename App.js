import LoginStack from './src/routes/LoginStack';
import ThemeWrapper from './src/shared/ThemeWrapper/ThemeWrapper';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { LanguageProvider } from './src/contexts/LanguageContext'
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import addExtensions from './extensions';
import * as SplashScreen from 'expo-splash-screen';

import { useCallback } from 'react';
import { LogBox, View } from 'react-native';
LogBox.ignoreLogs(['Setting a timer', 'AsyncStorage has been']);

// Adding custom language feature extensions
addExtensions();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "PacificoRegular": require("./src/assets/fonts/PacificoRegular.ttf")
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider>
        <ThemeWrapper>
          <LanguageProvider>
            <LoginStack />
          </LanguageProvider>
        </ThemeWrapper>
      </ThemeProvider >
    </View >
  );
}

registerRootComponent(App)