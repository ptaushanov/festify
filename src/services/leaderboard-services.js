import { firestore } from "../../firebase.v8";

export const findUser = (userId) => {
    return firestore
        .collection("users")
        .doc(userId)
        .get()
        .then(doc => {
            if (!doc.exists) { return null }
            const { xp, username, avatar } = doc.data()
            return { xp, username, avatar }
        })
}

export const findUserPlace = (userXP) => {
    return firestore
        .collection("users")
        .where("xp", ">=", userXP)
        .get()
        .then(querySnapshot => {
            let place = 0
            querySnapshot.forEach(() => { place++ })
            return place
        })
}