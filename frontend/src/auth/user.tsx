import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import type { AppAction } from '@/types'

export function onUserStateChanged(dispatch: React.Dispatch<AppAction>) {
    const auth = getAuth()

    return onAuthStateChanged(auth, (user) => {
        if (user) {
            if (user.emailVerified) {
                dispatch({ type: 'SET_USER_SIGNED_IN', payload: true })
            } else {
                signOut(auth)
            }
        } else {
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
