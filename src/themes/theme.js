import {
    configureFonts,
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
} from 'react-native-paper';

import {
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme
} from '@react-navigation/native';

import { palette, surfaceMaterials } from "./palette"

const fontConfig = {
    ios: {
        regular: {
            fontFamily: 'sans-serif',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'sans-serif-medium',
            fontWeight: 'normal',
        },
        light: {
            fontFamily: 'sans-serif-light',
            fontWeight: 'normal',
        },
        thin: {
            fontFamily: 'sans-serif-thin',
            fontWeight: 'normal',
        },
    },
    android: {
        regular: {
            fontFamily: 'sans-serif',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'sans-serif-medium',
            fontWeight: 'normal',
        },
        light: {
            fontFamily: 'sans-serif-light',
            fontWeight: 'normal',
        },
        thin: {
            fontFamily: 'sans-serif-thin',
            fontWeight: 'normal',
        },
    }
}

export const DefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    fonts: configureFonts(fontConfig),
    roundness: 6,
    colors: {
        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        ...palette,
        surfaceInput: surfaceMaterials.input.light,
        surfacePicker: surfaceMaterials.surfacePicker.light,
        surfaceCard: surfaceMaterials.surfaceCard.light,
        textReverse: PaperDarkTheme.colors.text
    },
};

export const DarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    fonts: configureFonts(fontConfig),
    roundness: 6,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
        ...palette,
        surfaceInput: surfaceMaterials.input.dark,
        surfacePicker: surfaceMaterials.surfacePicker.dark,
        surfaceCard: surfaceMaterials.surfaceCard.dark,
        textReverse: PaperDefaultTheme.colors.text
    },
};