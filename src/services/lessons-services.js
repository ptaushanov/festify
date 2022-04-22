import { firestore } from "../../firebase.v8";

export const updateSeasonsDataBySeasonNames = (seasons, snapshotHandler, errorHandler) => {
    return firestore
        .collection("seasons")
        .where("name", "in", seasons)
        .onSnapshot((querySnapshot) => {
            const docs = []
            querySnapshot.forEach(doc => {
                docs.push(doc.data())
            })

            const seasonsData = docs.reduce((acc, season) => {
                acc[season.name] = season.card_count
                return acc;
            }, {})

            snapshotHandler(seasonsData)
        }, (error) => {
            errorHandler(error)
        })
}

export const getUnlockedSeasons = (userId) => {
    return firestore
        .collection("users")
        .doc(userId)
        .get()
        .then(querySnapshot => {
            return querySnapshot.data()?.unlocked_seasons;
        })
}