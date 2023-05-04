import { getAuth, onAuthStateChanged } from "@firebase/auth"
import { useEffect, useState } from "react"

export function useAuthStatus() {
    // this hook is to check if the persson is logged in or not
    const [loggedIn, setLoggedIn] = useState(false)
    // a hook that check if user  info came or not, so we add the loading effect
    const [checkingStatus, setCheckingStatus] = useState(true)

    // checkimng if the person is authenticated or not
    useEffect(()=> {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            // checking if the user exist or not
            // the loggedin is false by default, but it becomes true if the user is authenticated.
            // we are checking if the user is logged in using the onAuthStateChanged
            if(user) {
                setLoggedIn(true)
            }
            setCheckingStatus(false)
        })
    }, [])
    return {loggedIn, checkingStatus}
}