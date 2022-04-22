import { auth, firestore } from "../../firebase.v8";

export const getSeasonByName = (season = "") => {
    return firestore
        .collection("seasons")
        .where("name", "==", season)
        .get()
        .then(querySnapshot => {
            if (!querySnapshot.empty) {
                return querySnapshot.docs[0]
            }
            return null
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