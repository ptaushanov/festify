import colors from "./colors.json"

export const palette = {
    primary: colors.teal["600"],
    accent: colors.red["700"],
    danger: colors.red["a700"],
    success: colors.green["600"],
    info: colors.lightblue["400"],
    logo: colors.red["a700"],
    auth: colors.teal["400"],
    textDisabled: colors.grey["500"],
}

export const surfaceMaterials = {
    input: {
        light: colors.grey["100"],
        dark: colors.grey["900"]
    },
    surfacePicker: {
        light: colors.grey["50"],
        dark: colors.grey["850"]
    },
    surfaceCard: {
        light: colors.grey["50"],
        dark: colors.grey["850"]
    }
}

export const customMaterials = {
    divider: {
        dark: colors.grey["800"],
        light: colors.grey["200"]
    }
}