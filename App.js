import LoginStack from './src/routes/LoginStack';
import ThemeWrapper from './src/shared/ThemeWrapper/ThemeWrapper';
import { ThemeProvider } from './src/contexts/ThemeContext';
import * as languages from "./src/languages"
import * as Localization from 'expo-localization';
import { registerRootComponent } from 'expo';
import i18n from 'i18n-js';
import { useFonts } from 'expo-font';
import addExtensions from './extensions';
import * as SplashScreen from 'expo-splash-screen';

import { useCallback } from 'react';
import { LogBox, View } from 'react-native';
LogBox.ignoreLogs(['Setting a timer', 'AsyncStorage has been']);

// Setting the key-value pairs for the different languages we want to support
i18n.translations = languages
// Set the locale of the app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

// Adding custom language feature extensions
addExtensions();
// SplashScreen.preventAutoHideAsync();

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
          <LoginStack />
        </ThemeWrapper>
      </ThemeProvider >
    </View >
  );
}

registerRootComponent(App)