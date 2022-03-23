import { auth, firestore } from "../../firebase.v8";

export const signUpUser = (newUser) => {
    const { username, email, password } = newUser;

    return auth.createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const { uid } = userCredentials.user
            return firestore
                .collection("users")
                .doc(uid)
                .set({ username })
        })

}

export const logInUser = (newUser) => {
    const { email, password } = newUser;

    return auth.signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user
            console.log("Logged in with: ", user.email)
        })
}

export const checkDuplicateUsername = (username) => {
    return firestore
        .collection("users")
        .where("username", "==", username)
        .get()
        .then(querySnapshot => {
            return !querySnapshot.empty
        })
}