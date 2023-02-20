import {
    configureFonts,
    MD3LightTheme,
    MD3DarkTheme,
    adaptNavigationTheme
} from 'react-native-paper';

import {
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';

import { palette, surfaceMaterials, customMaterials } from "./palette"

const {
    LightTheme: AdaptedNavigationDefaultTheme,
    DarkTheme: AdaptedNavigationDarkTheme
} = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme
})

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
    ...AdaptedNavigationDefaultTheme,
    ...MD3LightTheme,
    fonts: configureFonts(fontConfig),
    roundness: 6,
    colors: {
        ...AdaptedNavigationDefaultTheme.colors,
        ...MD3LightTheme.colors,
        ...palette,
        onSurfaceInput: surfaceMaterials.onSurfaceInput.light,
        surfaceInput: surfaceMaterials.surfaceInput.light,
        surfacePicker: surfaceMaterials.surfacePicker.light,
        surfaceCard: surfaceMaterials.surfaceCard.light,
        textReverse: MD3DarkTheme.colors.text,
        divider: customMaterials.divider.light
    },
};

export const DarkTheme = {
    ...MD3DarkTheme,
    ...AdaptedNavigationDarkTheme,
    fonts: configureFonts(fontConfig),
    roundness: 6,
    colors: {
        ...MD3DarkTheme.colors,
        ...AdaptedNavigationDarkTheme.colors,
        ...palette,
        onSurfaceInput: surfaceMaterials.onSurfaceInput.dark,
        surfaceInput: surfaceMaterials.surfaceInput.dark,
        surfacePicker: surfaceMaterials.surfacePicker.dark,
        surfaceCard: surfaceMaterials.surfaceCard.dark,
        textReverse: MD3LightTheme.colors.text,
        divider: customMaterials.divider.dark
    },
};