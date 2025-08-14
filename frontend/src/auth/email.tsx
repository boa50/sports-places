import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'

export function createUserWithEmail(email: string, password: string) {
    const auth = getAuth()

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user
            console.log('User created with success')
            // ...
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log('Error creating a new user')
            // ..
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
