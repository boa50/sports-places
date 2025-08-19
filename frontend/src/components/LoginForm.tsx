import { useState, useEffect } from 'react'
import { useAppContext } from '@/contexts/AppContext'
import { Button, FormModal, Input, Link } from './ui'

export default function LoginForm() {
    const { state, dispatch } = useAppContext()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [screen, setScreen] = useState<
        'signIn' | 'signUp' | 'forgotPassword'
    >('signIn')
    const [formTitle, setFormTitle] = useState<string>(
        'Sign in to your account'
    )

    const resetFields = () => {
        setEmail('')
        setPassword('')
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
            {screen === 'signIn' && (
                <SignInContent
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    setScreen={setScreen}
                />
            )}
            {screen === 'signUp' && (
                <SignUpContent
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                />
            )}
            {screen === 'forgotPassword' && (
                <ForgotPasswordContent email={email} setEmail={setEmail} />
            )}
        </FormModal>
    )
}

interface SignInContentProps {
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
    setScreen: React.Dispatch<
        React.SetStateAction<'signIn' | 'signUp' | 'forgotPassword'>
    >
}

function SignInContent({
    email,
    setEmail,
    password,
    setPassword,
    setScreen,
}: SignInContentProps) {
    return (
        <form className="space-y-6" action="#">
            <Input
                id="email"
                label="Email"
                type="email"
                placeholder="name@company.com"
                hint="Fill with your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isFullWidth={true}
            />
            <Input
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                hint="Fill with your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isFullWidth={true}
            />
            <div className="flex justify-end">
                <Link
                    title="Forgot password?"
                    onClick={() => setScreen('forgotPassword')}
                />
            </div>
            <Button title="Sign In" width="w-full" isSubmit={true} />
            <div className="flex gap-1">
                <span className="text-sm font-light text-gray-900">
                    Don’t have an account yet?
                </span>
                <Link title="Sign up" onClick={() => setScreen('signUp')} />
            </div>
        </form>
    )
}

interface SignUpContentProps {
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
}

function SignUpContent({
    email,
    setEmail,
    password,
    setPassword,
}: SignUpContentProps) {
    return (
        <form className="space-y-6" action="#">
            <Input
                id="email"
                label="Email"
                type="email"
                placeholder="name@company.com"
                hint="Fill with your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isFullWidth={true}
            />
            <Input
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                hint="Fill with your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isFullWidth={true}
            />
            <Button title="Sign Up" width="w-full" isSubmit={true} />
        </form>
    )
}

interface ForgotPasswordContentProps {
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
}

function ForgotPasswordContent({
    email,
    setEmail,
}: ForgotPasswordContentProps) {
    return (
        <form className="space-y-6" action="#">
            <Input
                id="email"
                label="Email"
                type="email"
                placeholder="name@company.com"
                hint="Fill with your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isFullWidth={true}
            />
            <Button title="Reset Password" width="w-full" isSubmit={true} />
        </form>
    )
}
