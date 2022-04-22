import { createContext, useState, useEffect, useContext } from "react"
import { auth } from "../../firebase.v8"
import {
    getUnlockedSeasons,
    updateSeasonsDataBySeasonNames,
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
    const [stopUpdates, setStopUpdates] = useState(() => () => { })

    const getSeasonsData = () => {
        getUnlockedSeasons(auth.currentUser.uid)
            .then(_unlockedSeasons => {
                setUnlockedSeasons(_unlockedSeasons)
            })

        const unsubscribeSeasonsData =
            updateSeasonsDataBySeasonNames(seasons, setSeasonsData, console.error)

        setStopUpdates((prevState) => () => {
            alert("hello")
            unsubscribeSeasonsData()
        })
    }

    const startUpdates = () => { getSeasonsData() }

    // useEffect(() => {
    //     if (auth.currentUser) {
    //         getSeasonsData();
    //     }
    // }, [auth.currentUser])

    const lessonsData = {
        seasons,
        unlockedSeasons,
        seasonsData,
        stopUpdates,
        startUpdates
    }

    return (
        <LessonsContext.Provider value={lessonsData}>
            {children}
        </LessonsContext.Provider>
    )
}