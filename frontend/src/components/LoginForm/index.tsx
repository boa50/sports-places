import { useState, useEffect } from 'react'
import { useAppContext } from '@/contexts/AppContext'
import { FormModal } from '../ui'
import SignInForm from './SignIn'
import SignUpForm from './SignUp'
import ForgotPasswordForm from './ForgotPassword'

export default function LoginForm() {
    const { state, dispatch } = useAppContext()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const [successMessage, setSuccessMessage] = useState<string | undefined>()
    const [screen, setScreen] = useState<
        'signIn' | 'signUp' | 'forgotPassword'
    >('signIn')
    const [formTitle, setFormTitle] = useState<string>(
        'Sign in to your account'
    )

    const resetFields = () => {
        setEmail('')
        setPassword('')
        setErrorMessage(undefined)
        setSuccessMessage(undefined)
    }

    useEffect(() => {
        resetFields()

        switch (screen) {
            case 'signIn':
                setFormTitle('Sign in to your account')
                break
            case 'signUp':
                setFormTitle('Create a new account')
                break
            case 'forgotPassword':
                setFormTitle('Reset your password')
                break

            default:
                setFormTitle('Sign in to your account')
                break
        }
    }, [screen])

    const handleCloseModal = () => {
        dispatch({ type: 'HIDE_LOGIN_FORM' })
        setScreen('signIn')
        resetFields()
    }

    return (
        <FormModal
            title={formTitle}
            isModalOpen={state.isLoginFormOpen}
            closeModal={handleCloseModal}
        >
            <div
                className={`flex justify-center w-full text-xs min-h-4 ${errorMessage !== undefined ? 'text-red-700' : 'text-sky-700'}`}
            >
                {errorMessage} {successMessage}
            </div>
            {screen === 'signIn' && (
                <SignInForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    setScreen={setScreen}
                    setErrorMessage={setErrorMessage}
                />
            )}
            {screen === 'signUp' && (
                <SignUpForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    setErrorMessage={setErrorMessage}
                />
            )}
            {screen === 'forgotPassword' && (
                <ForgotPasswordForm
                    email={email}
                    setEmail={setEmail}
                    setErrorMessage={setErrorMessage}
                    successMessage={successMessage}
                    setSuccessMessage={setSuccessMessage}
                />
            )}
        </FormModal>
    )
}
