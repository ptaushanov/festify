import { firestore } from "../../firebase.v9";

export const findRewards = () => {
    return firestore
        .collection("rewards")
        .get()
        .then(querySnapshot => {
            return querySnapshot.docs.map(doc => (
                { ...doc.data(), id: doc.id })
            )
        })
}

export const findUserRewards = (userId) => {
    return firestore
        .collection("users")
        .doc(userId)
        .get()
        .then(doc => {
            if (!doc.exists) { return null }
            const { collected_rewards } = doc.data()
            return collected_rewards
        })
}