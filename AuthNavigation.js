import React, {useState, useEffect} from 'react'
import {SignedInStack, SignedOutStack} from './screens/navigation'
import { auth } from './firebase'


// Detects if logged in and serves signed in stack
const authNavigation = () => {
    const [currentUser, setCurrentUser] = useState(null)


    const userHandler = user => 
    user ? setCurrentUser(user) : setCurrentUser(null)

    useEffect(() => 
        // Global listener for auth state changes
        auth.onAuthStateChanged(user => userHandler(user))
    , [])

    return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>
}

export default authNavigation
