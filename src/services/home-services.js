import { firestore } from "../../firebase.v9";

const getNowNoTime = () => {
    const now = new Date()
    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    )
}

export const findCurrentLesson = async (userId) => {
    const userDocument = await firestore
        .collection("users")
        .doc(userId)
        .get()

    if (!userDocument.exists) { return null }
    const { current_lesson } = userDocument.data()

    const seasonTimelineDoc = await firestore
        .collection("seasons_timeline")
        .doc(current_lesson.season)
        .get()

    if (!seasonTimelineDoc.exists) { return null }
    const { holidays } = seasonTimelineDoc.data()

    return {
        ...holidays[current_lesson.index],
        ...current_lesson
    }
}

export const claimReward = async (userId, gainedXP) => {
    const doc = await firestore
        .collection("users")
        .doc(userId)
        .get()

    if (!doc.exists) { return }
    const { xp } = doc.data()

    return firestore
        .collection("users")
        .doc(userId)
        .update({
            last_reward_claim: getNowNoTime().valueOf(),
            xp: xp + gainedXP
        })
}

export const checkDailyReward = (userId) => {
    return firestore
        .collection("users")
        .doc(userId)
        .get()
        .then(doc => {
            if (!doc.exists) { return false }
            const { last_reward_claim } = doc.data()
            const lastClaimDate = new Date(last_reward_claim)

            const nowNoTime = getNowNoTime()
            return lastClaimDate.getTime() < nowNoTime.getTime()
        })
}