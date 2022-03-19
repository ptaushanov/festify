import {
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
} from 'react-native-paper';

import {
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme
} from '@react-navigation/native';


import { palette } from "./palette"

export const DefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    roundness: 2,
    colors: {
        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        primary: palette.primary,
        accent: palette.accent
    },
};

export const DarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    roundness: 2,
    colors: {
        ...NavigationDarkTheme.colors,
        ...PaperDarkTheme.colors,
        primary: palette.primary,
        accent: palette.accent
    },
};