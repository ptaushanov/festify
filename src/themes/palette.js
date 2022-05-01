import colors from "./colors.json"

export const palette = {
    primary: colors.teal["600"],
    accent: colors.red["700"],
    danger: colors.red["a700"],
    success: colors.green["600"],
    info: colors.lightblue["400"],
    logo: colors.red["a700"],
    auth: colors.teal["400"],
    xp: colors.amber["800"],
    textDisabled: colors.grey["500"],
    gold: colors.yellow["800"],
    silver: colors.bluegrey["400"],
    bronze: colors.deeporange["900"]
}

export const surfaceMaterials = {
    onSurfaceInput: {
        light: colors.grey["100"],
        dark: colors.grey["850"]
    },
    surfaceInput: {
        light: colors.grey["50"],
        dark: colors.grey["850"]
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