import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
} from 'firebase/auth'

export function createUserWithEmail(
    email: string,
    password: string,
    setErrorMessage?: (message: string) => void,
    setSuccessMessage?: (message: string) => void,
    setIsProcessing?: (status: boolean) => void
) {
    const auth = getAuth()

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            sendEmailVerification(userCredential.user)

            if (setSuccessMessage !== undefined)
                setSuccessMessage(
                    'Email verification sent. Please check your inbox'
                )
        })
        .catch((error) => {
            if (setErrorMessage !== undefined)
                switch (error.code) {
                    case 'auth/weak-password':
                        setErrorMessage(
                            'The password should have at least 6 characters'
                        )
                        break
                    case 'auth/email-already-in-use':
                        setErrorMessage('Email already in use')
                        break
                    default:
                        setErrorMessage(
                            'An error occurred while creating an account, try again later'
                        )
                        break
                }
        })
        .finally(() => {
            if (setIsProcessing !== undefined) setIsProcessing(false)
        })
}

export async function signInWithEmail(email: string, password: string) {
    const auth = getAuth()

    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            if (!userCredential.user.emailVerified)
                return { type: 'error', payload: 'auth/mail-unverified' }

            return { type: 'success', payload: userCredential.user.uid }
        })
        .catch((error) => {
            return { type: 'error', payload: error.code }
        })
}

export function resetPassword(
    email: string,
    setSuccessMessage?: (message: string) => void,
    setErrorMessage?: (message: string) => void,
    setIsProcessing?: (status: boolean) => void
) {
    const auth = getAuth()

    sendPasswordResetEmail(auth, email)
        .then(() => {
            if (setSuccessMessage !== undefined)
                setSuccessMessage('Password reset email sent')
        })
        .catch(() => {
            if (setErrorMessage !== undefined)
                setErrorMessage(
                    'An error occurred while processing the request, try again later'
                )
        })
        .finally(() => {
            if (setIsProcessing !== undefined) setIsProcessing(false)
        })
}
