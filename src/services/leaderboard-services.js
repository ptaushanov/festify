import { firestore } from "../../firebase.v8";

export const findCurrentUser = (userId) => {
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

