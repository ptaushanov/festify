import { createContext, useState, useContext } from "react"
const LanguageContext = createContext()

export function useLanguage() {
    return useContext(LanguageContext)
}

export function LanguageProvider({ children }) {
    const [locale, setLocale] = useState(false)
    const languageProviderData = { locale, setLocale }

    return (
        <LanguageContext.Provider value={languageProviderData}>
            {children}
        </LanguageContext.Provider>
    )
}