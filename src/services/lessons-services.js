import { firestore } from "../../firebase.v8";

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