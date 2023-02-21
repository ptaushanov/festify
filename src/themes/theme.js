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
import { PaletteLight, PaletteDark } from './dynamicPalette';

import { Platform } from 'react-native';

const {
    LightTheme: AdaptedNavigationDefaultTheme,
    DarkTheme: AdaptedNavigationDarkTheme
} = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme
})

const selectedFontFamily = Platform.select({
    web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
    ios: 'System',
    default: 'sans-serif'
})

const fontConfig = { fontFamily: selectedFontFamily }

export const DefaultTheme = {
    ...AdaptedNavigationDefaultTheme,
    ...MD3LightTheme,
    fonts: configureFonts(fontConfig),
    roundness: 6,
    colors: {
        ...AdaptedNavigationDefaultTheme.colors,
        ...MD3LightTheme.colors,
        ...palette,
        ...PaletteLight.colors,
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
    fonts: configureFonts({ config: fontConfig }),
    roundness: 6,
    version: 3,
    colors: {
        ...MD3DarkTheme.colors,
        ...AdaptedNavigationDarkTheme.colors,
        ...palette,
        ...PaletteDark.colors,
        onSurfaceInput: surfaceMaterials.onSurfaceInput.dark,
        surfaceInput: surfaceMaterials.surfaceInput.dark,
        surfacePicker: surfaceMaterials.surfacePicker.dark,
        surfaceCard: surfaceMaterials.surfaceCard.dark,
        textReverse: MD3LightTheme.colors.text,
        divider: customMaterials.divider.dark
    },
};