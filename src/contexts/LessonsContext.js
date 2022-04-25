import { createContext, useState, useContext, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"

import { auth } from "../../firebase.v8"
import {
    updateUnlockedSeasons,
    updateSeasonsDataBySeasonNames,
    findTimelineDataBySeason,
    findUnlockedLessonsBySeason
} from "../services/lessons-services"

const LessonsContext = createContext()

export function useLessonsInfo() {
    return useContext(LessonsContext)
}

export function LessonsProvider({ children }) {
    const seasons = ["spring", "summer", "autumn", "winter"]

    const [seasonsData, setSeasonsData] = useState({})
    const [unlockedSeasons, setUnlockedSeasons] = useState([])

    const handleUpdatedSeasonsData = (newSeasonData) => {
        setSeasonsData(prevSeasonsData => {
            return {
                ...prevSeasonsData,
                ...newSeasonData
            }
        })
    }

    const getSeasonsData = () => {
        const unsubscribeUnlockedSeasons =
            updateUnlockedSeasons(
                auth.currentUser.uid,
                setUnlockedSeasons,
                console.error
            )

        const unsubscribeSeasonsData =
            updateSeasonsDataBySeasonNames(seasons, handleUpdatedSeasonsData, console.error)

        return () => {
            unsubscribeUnlockedSeasons()
            unsubscribeSeasonsData()
        }
    }

    const getTimelineDataBySeason = (season) => {
        return findTimelineDataBySeason(season)
            .catch(error => console.error(error))
    }

    const getUnlockedLessonsBySeason = (season) => {
        return findUnlockedLessonsBySeason(auth.currentUser.uid, season)
            .catch(error => console.error(error))
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
        getTimelineDataBySeason,
        getUnlockedLessonsBySeason
    }

    return (
        <LessonsContext.Provider value={lessonsData}>
            {children}
        </LessonsContext.Provider>
    )
}