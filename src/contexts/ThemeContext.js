const { useContext, useState, useEffect } = require("react");
import { DefaultTheme, DarkTheme } from "../themes/theme";

const ThemeContext = useContext()

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false)
    const [currentTheme, setCurrentTheme] = useState(DefaultTheme)

    useEffect(() => {
        darkMode ? setCurrentTheme(DarkTheme) : setCurrentTheme(DefaultTheme)
    }, [darkMode])

    const changeTheme = (theme) => {
        switch (theme) {
            case 'default':
                setCurrentTheme(DefaultTheme)
            case 'dark':
                setCurrentTheme(DarkTheme)
        }
    }

    const toggleTheme = () => { setDarkMode(!darkMode) }

    const providerData = {
        darkMode,
        currentTheme,
        changeTheme,
        toggleTheme
    }

    return (
        <ThemeContext.Provider value={providerData}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;