import { firestore } from "../../firebase.v8";

export const updateSeasonsDataBySeasonNames = (seasons, snapshotHandler, errorHandler) => {
    const seasonReferences =
        seasons.map(season => firestore.collection("seasons").doc(season))

    const unsubscribeArray = []
    seasonReferences
        .forEach(reference => {
            const unsubscribe =
                reference.onSnapshot((document) => {
                    if (!document.data()) { return }

                    const { card_count } = document.data()
                    const seasonName = document.id

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