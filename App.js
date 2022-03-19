import HomeStack from './src/routes/HomeStack';
import ThemeWrapper from './src/shared/ThemeWrapper/ThemeWrapper';
import { ThemeProvider } from './src/contexts/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <HomeStack />
      </ThemeWrapper>
    </ThemeProvider >

  );
}