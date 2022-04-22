import { createContext, useState, useContext, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"

import { auth } from "../../firebase.v8"
import {
    updateUnlockedSeasons,
    updateSeasonsDataBySeasonNames,
} from "../services/lessons-services"

const LessonsContext = createContext()

export function useLessonsInfo() {
    return useContext(LessonsContext)
}

export function LessonsProvider({ children }) {
    const seasons = ["spring", "summer", "autumn", "winter"]

    const [seasonsData, setSeasonsData] = useState({})
    const [unlockedSeasons, setUnlockedSeasons] = useState([])

    const getSeasonsData = () => {
        const unsubscribeUnlockedSeasons =
            updateUnlockedSeasons(
                auth.currentUser.uid,
                setUnlockedSeasons,
                console.error
            )

        const unsubscribeSeasonsData =
            updateSeasonsDataBySeasonNames(seasons, setSeasonsData, console.error)

        return () => {
            unsubscribeUnlockedSeasons()
            unsubscribeSeasonsData()
        }
    }

    useFocusEffect(
        useCallback(() => {
            if (auth.currentUser) {
                const unsubscribe = getSeasonsData()
                return () => {
                    unsubscribe()
                }
            }
        }, [auth.currentUser])
    );

    const lessonsData = {
        seasons,
        unlockedSeasons,
        seasonsData,
    }

    return (
        <LessonsContext.Provider value={lessonsData}>
            {children}
        </LessonsContext.Provider>
    )
}