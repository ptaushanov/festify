import { DefaultTheme } from 'react-native-paper';
import { palette } from "./palette"

export const defaultTheme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: palette.primary,
        accent: palette.accent
    },
};