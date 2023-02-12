import { firestore } from "../../firebase.v9";

export const updateUser = (userId, snapshotHandler, errorHandler) => {
    return firestore
        .collection("users")
        .doc(userId)
        .onSnapshot(querySnapshot => {
            const { xp, username, avatar } = querySnapshot.data()
            snapshotHandler({ xp, username, avatar })
        }, (error) => {
            errorHandler(error)
        })
}

export const findUserPlace = (userXP) => {
    return firestore
        .collection("users")
        .where("xp", ">=", userXP)
        .get()
        .then(querySnapshot => {
            return querySnapshot.docs.reduce(acc => acc + 1, 0)
        })
}

export const updateUsersSorted = (snapshotHandler, errorHandler) => {
    return firestore
        .collection("users")
        .orderBy("xp", "desc")
        .limit(100)
        .onSnapshot(querySnapshot => {
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
            snapshotHandler(users);
        }, (error) => {
            errorHandler(error)
        })

}