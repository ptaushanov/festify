import { auth, firestore } from "../../firebase.v8";

export const signUpUser = (newUser) => {
    const { username, email, password } = newUser;
    const unlocked_seasons = ["spring"]
    const unlocked_lessons = { spring: [0], summer: [0], autumn: [0], winter: [0] }
    const completed_lessons = { spring: [], summer: [], autumn: [], winter: [] }
    const current_lesson = { season: "spring", index: 0 }
    const collected_rewards = []

    const userData = {
        username,
        unlocked_seasons,
        unlocked_lessons,
        completed_lessons,
        current_lesson,
        collected_rewards,
        last_reward_claim: 0,
        xp: 0
    }

    return auth.createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const { uid } = userCredentials.user
            return firestore
                .collection("users")
                .doc(uid)
                .set(userData)
        })
}

export const logInUser = (newUser) => {
    const { email, password } = newUser;

    return auth.signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user
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