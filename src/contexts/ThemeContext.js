import { createContext, useState, useEffect, useContext, useRef } from "react"
import { DefaultTheme, DarkTheme } from "../themes/theme";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext()

export function useTheme() {
    return useContext(ThemeContext)
}

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false)
    const [currentTheme, setCurrentTheme] = useState(DefaultTheme)

    useEffect(() => {
        darkMode ? setCurrentTheme(DarkTheme) : setCurrentTheme(DefaultTheme)
    }, [darkMode])

    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false
            getTheme()
        }
        else { saveCurrentTheme() }
    }, [currentTheme])

    const changeTheme = (theme) => {
        switch (theme) {
            case 'default':
                setDarkMode(false)
                break;
            case 'dark':
                setDarkMode(true)
                break
            default:
                setDarkMode(false)
        }
    }

    const getTheme = async () => {
        try {
            const theme = await AsyncStorage.getItem("theme")
            if (theme !== null) {
                changeTheme(theme)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const saveCurrentTheme = async () => {
        try {
            await AsyncStorage
                .setItem("theme", darkMode ? "dark" : "default")
        } catch (error) {
            console.error(error)
        }
    }

    const toggleTheme = () => { setDarkMode(!darkMode) }

    const themeProviderData = {
        darkMode,
        currentTheme,
        changeTheme,
        toggleTheme
    }

    return (
        <ThemeContext.Provider value={themeProviderData}>
            {children}
        </ThemeContext.Provider>
    )
}