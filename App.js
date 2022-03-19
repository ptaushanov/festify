import LoginStack from './src/routes/LoginStack';
import ThemeWrapper from './src/shared/ThemeWrapper/ThemeWrapper';
import { ThemeProvider } from './src/contexts/ThemeContext';
import * as languages from "./src/languages"
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading';

// Setting the key-value pairs for the different languages we want to support
i18n.translations = languages
// Set the locale of the app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

export default function App() {
  const [fontsLoaded] = useFonts({
    "PacificoRegular": require("./src/assets/fonts/PacificoRegular.ttf")
  })

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider>
      <ThemeWrapper>
        <LoginStack />
      </ThemeWrapper>
    </ThemeProvider >
  );
}