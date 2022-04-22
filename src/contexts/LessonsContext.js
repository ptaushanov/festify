import { createContext, useState, useEffect, useContext } from "react"
import { auth } from "../../firebase.v8"
import {
    getUnlockedSeasons,
    updateSeasonsDataBySeasonNames,
    listenToSeasonUpdates
} from "../services/lessons-services"

const LessonsContext = createContext()

export function useLessonsInfo() {
    return useContext(LessonsContext)
}

export function LessonsProvider({ children }) {
    // Enum seasons
    const seasons = ["spring", "summer", "autumn", "winter"]

    const [seasonsData, setSeasonsData] = useState({})
    const [unlockedSeasons, setUnlockedSeasons] = useState([])
    const [unsubscribeLiveUpdates, setUnsubscribeLiveUpdates] = useState([])

    const getSeasonsData = () => {
        getUnlockedSeasons(auth.currentUser.uid)
            .then(_unlockedSeasons => {
                setUnlockedSeasons(_unlockedSeasons)
            })

        const unsubscribeSeasonsData =
            updateSeasonsDataBySeasonNames(seasons, setSeasonsData, console.error)

        setUnsubscribeLiveUpdates([() => {
            alert("jj")
            unsubscribeSeasonsData()
        }])
    }

    useEffect(() => {
        if (auth.currentUser) {
            getSeasonsData();
        }
        return unsubscribeLiveUpdates[0]
    }, [auth.currentUser])

    const lessonsData = {
        seasons,
        unlockedSeasons,
        seasonsData,
        getSeasonsData,
        unsubscribeLiveUpdates
    }

    return (
        <LessonsContext.Provider value={lessonsData}>
            {children}
        </LessonsContext.Provider>
    )
}