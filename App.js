import LoginStack from './src/routes/LoginStack';
import ThemeWrapper from './src/shared/ThemeWrapper/ThemeWrapper';
import { ThemeProvider } from './src/contexts/ThemeContext';
import * as languages from "./src/languages"
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

// Setting the key-value pairs for the different languages we want to support
i18n.translations = languages
// Set the locale of the app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

export default function App() {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <LoginStack />
      </ThemeWrapper>
    </ThemeProvider >

  );
}