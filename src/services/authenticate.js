import { auth, firestore } from "../../firebase.v9";
import { registerForPushNotificationsAsync } from "../services/notifications";

export const signUpUser = async (newUser) => {
    const { username, email, password } = newUser;
    const unlocked_seasons = ["spring"]
    const unlocked_lessons = { spring: [0], summer: [0], autumn: [0], winter: [0] }
    const completed_lessons = { spring: [], summer: [], autumn: [], winter: [] }
    const current_lesson = { season: "spring", index: 0 }
    const collected_rewards = []

    const notification_token = await registerForPushNotificationsAsync()

    const userData = {
        username,
        unlocked_seasons,
        unlocked_lessons,
        completed_lessons,
        current_lesson,
        collected_rewards,
        last_reward_claim: 0,
        xp: 0,
        notification_token
    }

    const userCredentials = await auth.createUserWithEmailAndPassword(email, password)
    const { uid } = userCredentials.user
    return firestore.collection("users")
        .doc(uid)
        .set(userData)
}

export const logInUser = async (newUser) => {
    const { email, password } = newUser;

    const userCredentials = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredentials.user;

    const userDoc = await firestore
        .collection("users")
        .doc(user.uid)
        .get()

    if (!userDoc.exists) throw new Error("User not found")
    return user
}

export const checkDuplicateUsername = async (username) => {
    const querySnapshot = await firestore
        .collection("users")
        .where("username", "==", username)
        .get();
    return !querySnapshot.empty;
}