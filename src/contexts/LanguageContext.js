import {
    createContext, useState, useEffect,
    useContext, useRef
} from "react"
import i18n from 'i18n-js';
import * as languages from "../languages"
import { locale as systemLocale } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageContext = createContext()

export function useLanguage() {
    return useContext(LanguageContext)
}

export function LanguageProvider({ children }) {
    const [currentLocale, setCurrentLocale] = useState("system")
    const [isTranslationLoaded, setIsTranslationLoaded] = useState(false);

    const isFirstRun = useRef(true);

    i18n.translations = languages
    i18n.fallbacks = true

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false
            getLocale()
        }
        else { saveCurrentLocale() }
    }, [currentLocale])

    const changeLocale = (newLocale) => {
        if (newLocale === "system")
            newLocale = systemLocale

        i18n.locale = newLocale
        setCurrentLocale(newLocale)
    }

    const getLocale = async () => {
        try {
            const locale = await AsyncStorage.getItem("locale")
            if (locale !== null) {
                changeLocale(locale)
            }
            setIsTranslationLoaded(true);
        } catch (error) {
            console.error(error)
        }
    }

    const saveCurrentLocale = async () => {
        try {
            await AsyncStorage.setItem("locale", currentLocale)
        } catch (error) {
            console.error(error)
        }
    }

    const languageProviderData = { currentLocale, changeLocale }

    if (!isTranslationLoaded) return null;

    return (
        <LanguageContext.Provider value={languageProviderData}>
            {children}
        </LanguageContext.Provider>
    )
}