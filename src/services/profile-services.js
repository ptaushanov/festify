import { storage, firestore } from "../../firebase.v9";

export const getProfilePictureURL = (userId) => {
    return firestore
        .collection("users")
        .doc(userId)
        .get()
        .then(querySnapshot => {
            return querySnapshot.data()?.avatar;
        })
}

export const storeProfilePicture = async (uri, userId) => {
    const filename = uri.substring(uri.lastIndexOf('/') + 1)

    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (error) {
            console.error(error);
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    return storage
        .ref(`images/users/${userId}/${filename}`)
        .put(blob)
        .then(snapshot => {
            URL.revokeObjectURL(blob);
            return snapshot.ref.getDownloadURL()
        })
}

export const getUsername = (userId) => {
    return firestore
        .collection("users")
        .doc(userId)
        .get()
        .then(querySnapshot => {
            return querySnapshot.data()?.username;
        })
}

export const updateUserInformation = (userId, { username, avatar }) => {
    return firestore
        .collection("users")
        .doc(userId)
        .update({ username, avatar })
}