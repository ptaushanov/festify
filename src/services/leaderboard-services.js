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

export const findUsersSorted = () => {
    return firestore
        .collection("users")
        .orderBy("xp", "desc")
        .limit(100)
        .get()
        .then(querySnapshot => {
            const users = []
            let currentPlace = 0

            querySnapshot.forEach((doc) => {
                const { xp, username, avatar } = doc.data()
                users.push({
                    xp, username, avatar,
                    place: currentPlace + 1,
                })
                currentPlace++
            })
            return users;
        })
}