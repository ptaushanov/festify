import { firestore } from "../../firebase.v8";

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