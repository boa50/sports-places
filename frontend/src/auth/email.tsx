import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'

export function createUserWithEmail(
    email: string,
    password: string,
    setErrorMessage?: (message: string) => void,
    setIsProcessing?: (status: boolean) => void
) {
    const auth = getAuth()

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {})
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

export function signInWithEmail(
    email: string,
    password: string,
    setErrorMessage?: (message: string) => void,
    setIsProcessing?: (status: boolean) => void
) {
    const auth = getAuth()

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {})
        .catch((error) => {
            if (setErrorMessage !== undefined)
                switch (error.code) {
                    case 'auth/invalid-credential':
                        setErrorMessage('Invalid email or password')
                        break
                    default:
                        setErrorMessage(
                            'An error occurred while signing in, try again later'
                        )
                        break
                }
        })
        .finally(() => {
            if (setIsProcessing !== undefined) setIsProcessing(false)
        })
}
