import { firestore } from "../../firebase.v9";

export const updateSeasonsDataBySeasonNames = (seasons, snapshotHandler, errorHandler) => {
    const seasonReferences =
        seasons.map(season => firestore.collection("seasons").doc(season))

    const unsubscribeArray = []
    seasonReferences
        .forEach(reference => {
            const unsubscribe =
                reference.onSnapshot((doc) => {
                    if (!doc.exists) { return }

                    const { card_count } = doc.data()
                    const seasonName = doc.id

                    const seasonsData = {
                        [seasonName]: card_count
                    }

                    snapshotHandler(seasonsData)
                }, (error) => {
                    errorHandler(error)
                })
            unsubscribeArray.push(unsubscribe)
        })

    const unsubscribeFunction = () => unsubscribeArray.forEach(unsubscribe => unsubscribe())
    return unsubscribeFunction
}

export const updateUnlockedSeasons = (userId, snapshotHandler, errorHandler) => {
    return firestore
        .collection("users")
        .doc(userId)
        .onSnapshot(doc => {
            snapshotHandler(doc.data()?.unlocked_seasons)
        }, (error) => {
            errorHandler(error)
        })
}

export const findTimelineDataBySeason = (season) => {
    return firestore
        .collection("seasons_timeline")
        .doc(season)
        .get()
        .then(doc => {
            if (!doc.exists) { return null }
            return doc.data()
        })
}

export const findUnlockedLessonsBySeason = (userId, season) => {
    return firestore
        .collection("users")
        .doc(userId)
        .get()
        .then(doc => {
            if (!doc.exists) { return null }
            const { unlocked_lessons } = doc.data()
            return unlocked_lessons[season]
        })
}

export const findLesson = (lessonRef) => {
    return lessonRef
        .get()
        .then(doc => {
            if (!doc.exists) { return null }
            return doc.data()
        })
}

export const findReward = (rewardRef) => {
    return rewardRef
        .get()
        .then(doc => {
            if (!doc.exists) { return null }
            return { ...doc.data(), id: doc.id }
        })
}

export const completeLesson =
    async (userId, season, lessonIndex, gainedXP, rewardId = null) => {
        const document = await firestore
            .collection("users")
            .doc(userId)
            .get()

        if (!document.exists) { return }

        const { completed_lessons, xp, collected_rewards } = document.data()
        const withNewCompletedLesson = [
            ...completed_lessons[season],
            lessonIndex
        ]

        const updatedData = {
            [`completed_lessons.${season}`]: withNewCompletedLesson,
            xp: xp + gainedXP,
        }

        if (rewardId) {
            const withNewReward = [...collected_rewards, rewardId]
            updatedData.collected_rewards = withNewReward
        }

        return firestore
            .collection("users")
            .doc(userId)
            .update(updatedData)
    }

export const checkCompletedLesson = (userId, season, lessonIndex) => {
    return firestore
        .collection("users")
        .doc(userId)
        .get()
        .then(doc => {
            if (!doc.exists) { return false }
            const { completed_lessons } = doc.data()
            return completed_lessons[season]?.includes(lessonIndex)
        })
}

export const unlockNewLesson = async (userId, season, lessonIndex) => {
    const document = await firestore
        .collection("users")
        .doc(userId)
        .get()

    if (!document.exists) { return }

    const { unlocked_lessons } = document.data()
    const withNewUnlockedLesson = [
        ...unlocked_lessons[season],
        lessonIndex
    ]

    return firestore
        .collection("users")
        .doc(userId)
        .update({
            [`unlocked_lessons.${season}`]: withNewUnlockedLesson,
            current_lesson: { season, index: lessonIndex }
        })
}

export const unlockNexSeason = async (userId, season) => {
    const document = await firestore
        .collection("users")
        .doc(userId)
        .get()

    if (!document.exists) { return }

    const { unlocked_seasons } = document.data()
    const withNewUnlockedSeason = [
        ...unlocked_seasons,
        season
    ]

    return firestore
        .collection("users")
        .doc(userId)
        .update({
            unlocked_seasons: withNewUnlockedSeason,
            current_lesson: { season, index: 0 }
        })
}

export const findCurrentLesson = async (userId) => {
    const userDocument = await firestore
        .collection("users")
        .doc(userId)
        .get()

    if (!userDocument.exists) { return null }
    const { current_lesson } = userDocument.data()

    return current_lesson
}