import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import type { AppAction } from '@/types'

export function onUserStateChanged(dispatch: React.Dispatch<AppAction>) {
    const auth = getAuth()

    return onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid
            console.log('user signed in ', uid, user.displayName)
            dispatch({ type: 'SET_USER_SIGNED_IN', payload: true })
            dispatch({ type: 'HIDE_LOGIN_FORM' })
        } else {
            console.log('user signed out')
            dispatch({ type: 'SET_USER_SIGNED_IN', payload: false })
        }
    })
}

export function getCurrentUser() {
    const auth = getAuth()
    const user = auth.currentUser

    return user
}

export function signOutUser() {
    const auth = getAuth()
    signOut(auth)
}
