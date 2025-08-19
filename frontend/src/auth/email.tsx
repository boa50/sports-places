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
        .then((userCredential) => {
            console.log('User Created', userCredential.user)
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
                            'An error occurred while creatin an account, try again later'
                        )
                        break
                }
        })
        .finally(() => {
            if (setIsProcessing !== undefined) setIsProcessing(false)
        })
}

export function signInWithEmail(email: string, password: string) {
    const auth = getAuth()

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user
            // ...
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
        })
}
