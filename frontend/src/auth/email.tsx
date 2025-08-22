import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
} from 'firebase/auth'

export async function createUserWithEmail(email: string, password: string) {
    const auth = getAuth()

    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            sendEmailVerification(userCredential.user)
            return { type: 'success', payload: 'auth/email-verification-sent' }
        })
        .catch((error) => {
            return { type: 'error', payload: error.code }
        })
}

export async function signInWithEmail(email: string, password: string) {
    const auth = getAuth()

    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            if (!userCredential.user.emailVerified)
                return { type: 'error', payload: 'auth/email-unverified' }

            return { type: 'success', payload: userCredential.user.uid }
        })
        .catch((error) => {
            return { type: 'error', payload: error.code }
        })
}

export async function resetPassword(email: string) {
    const auth = getAuth()

    return sendPasswordResetEmail(auth, email)
        .then(() => {
            return { type: 'success', payload: 'auth/email-reset-sent' }
        })
        .catch((error) => {
            return { type: 'error', payload: error.code }
        })
}
