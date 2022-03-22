import { auth } from "../../../firebase.v8";
import { useState, useEffect } from "react";

function useAuth() {
    const [hasLoggedIn, setHasLoggedIn] = useState(false)
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setHasLoggedIn(true)
                return
            }
            setHasLoggedIn(false)
        })
        return unsubscribe
    }, [])

    return hasLoggedIn;
}


export default useAuth;