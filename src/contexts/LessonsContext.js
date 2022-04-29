import { createContext, useState, useContext, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"

import { auth } from "../../firebase.v8"
import {
    updateUnlockedSeasons,
    updateSeasonsDataBySeasonNames,
    findTimelineDataBySeason,
    findUnlockedLessonsBySeason,
    findLesson,
    completeLesson as completeLessonService,
    checkCompletedLesson as checkCompletedLessonService,
    unlockNewLesson as unlockNewLessonService,
    unlockNexSeason as unlockNewSeasonService
} from "../services/lessons-services"

const LessonsContext = createContext()

export function useLessonsInfo() {
    return useContext(LessonsContext)
}

export function LessonsProvider({ children }) {
    const seasons = ["spring", "summer", "autumn", "winter"]

    const [seasonsData, setSeasonsData] = useState({})

    const [unlockedSeasons, setUnlockedSeasons] = useState([])
    const [currentLessonRef, setCurrentLessonRef] = useState(null)
    const [currentSeason, setCurrentSeason] = useState(null)
    const [currentLessonIndex, setCurrentLessonIndex] = useState(-1)

    const [lessonData, setLessonData] = useState(null)
    const [currentStep, setCurrentStep] = useState(0)
    const [lessonFinished, setLessonFinished] = useState(false)

    const [counter, setCounter] = useState({
        pageCount: 0,
        questionCount: 0,
        stepsCount: 0
    })

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

    const getTimelineDataBySeason = async (season) => {
        try {
            return await findTimelineDataBySeason(season)
        } catch (error) {
            console.error(error)
        }
    }

    const getUnlockedLessonsBySeason = async (season) => {
        try {
            return await findUnlockedLessonsBySeason(auth.currentUser.uid, season)
        } catch (error) {
            console.error(error)
        }
    }

    const determineCounts = (lessonData) => {
        const { content, questions } = lessonData
        const pageCount = content ? Object.keys(content).length : 0
        const questionCount = questions ? questions.length : 0

        setCounter((prevCounter) => ({
            ...prevCounter,
            pageCount,
            questionCount,
            stepsCount: pageCount + questionCount
        }))
    }

    const loadLessonData = async () => {
        try {
            const _lessonData = await findLesson(currentLessonRef)
            setLessonData(_lessonData)
            determineCounts(_lessonData)
        } catch (error) {
            console.error(error)
        }
    }

    const unloadLessonData = () => {
        setLessonData(null)
        setCurrentStep(0)
        setLessonFinished(false)
    }

    const completeLesson = async () => {
        const { xp_reward = 0 } = lessonData
        try {
            return await completeLessonService(
                auth.currentUser.uid,
                currentSeason,
                currentLessonIndex,
                xp_reward
            )
        } catch (error) {
            console.error(error)
        }
    }

    const checkCompletedLesson = async () => {
        try {
            return await checkCompletedLessonService(
                auth.currentUser.uid,
                currentSeason,
                currentLessonIndex,
            )
        } catch (error) {
            console.error(error)
        }
    }

    const unlockNewLesson = async () => {
        try {
            const nextLessonIndex = currentLessonIndex + 1
            return await unlockNewLessonService(
                auth.currentUser.uid,
                currentSeason,
                nextLessonIndex,
            )
        } catch (error) {
            console.error(error)
        }
    }

    const unlockNewSeason = async () => {
        try {
            const nextSeasonIndex = seasons.indexOf(currentSeason) + 1
            const nextSeason = seasons[nextSeasonIndex]

            if (typeof nextSeason === "string") {
                return await unlockNewSeasonService(
                    auth.currentUser.uid,
                    nextSeason,
                )
            }
        } catch (error) {
            console.error(error)
        }
    }

    const tryUnlockNewLessonOrSeason = () => {
        const hasNext = !lessonData.last_for_season
        if (hasNext) { unlockNewLesson() }
        else { unlockNewSeason() }
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
        currentLessonRef,
        setCurrentLessonRef,
        getTimelineDataBySeason,
        getUnlockedLessonsBySeason,
        loadLessonData,
        unloadLessonData,
        lessonData,
        currentStep,
        setCurrentStep,
        counter,
        lessonFinished,
        setLessonFinished,
        currentLessonIndex,
        setCurrentLessonIndex,
        currentSeason,
        setCurrentSeason,
        completeLesson,
        checkCompletedLesson,
        tryUnlockNewLessonOrSeason
    }

    return (
        <LessonsContext.Provider value={lessonsData}>
            {children}
        </LessonsContext.Provider>
    )
}