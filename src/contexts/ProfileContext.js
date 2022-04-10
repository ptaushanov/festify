import { createContext, useState, useEffect, useContext } from "react"
import { auth } from "../../firebase.v8"
import { getUsername, getProfilePictureURL, updateUserInformation } from "../services/profile-services"

const ProfileContext = createContext()

export function useProfileInfo() {
    return useContext(ProfileContext)
}

export function ProfileProvider({ children }) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState(null)

    const handleGetUsername = () => {
        getUsername(auth.currentUser.uid)
            .then(uname => setUsername(uname))
            .catch(error => console.error(error))
    }

    const handleGetAvatar = () => {
        getProfilePictureURL(auth.currentUser.uid)
            .then((url) => setAvatar(url))
            .catch(error => console.error(error))
    }

    const updateProfile = ({ newUsername, newAvatar }) => {
        const profileData = {
            username: newUsername ?? username,
            avatar: newAvatar ?? avatar
        }

        updateUserInformation(auth.currentUser.uid, profileData)
            .then(() => {
                setUsername(profileData.username)
                setAvatar(profileData.avatar)
            })
            .catch(error => console.error(error))
    }

    useEffect(() => {
        if (auth.currentUser) {
            handleGetUsername()
            setEmail(auth.currentUser?.email)
        }
        handleGetAvatar()
    }, [auth.currentUser])

    const profileData = {
        username,
        email,
        avatar,
        updateProfile
    }

    return (
        <ProfileContext.Provider value={profileData}>
            {children}
        </ProfileContext.Provider>
    )
}