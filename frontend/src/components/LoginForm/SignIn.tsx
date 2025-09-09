import { useState } from 'react'
import { useAppContext } from '@/contexts/AppContext'
import { signInWithEmail } from '@/auth'
import { Button, Input, Link, ProcessingButton } from '../ui'
import type { AppAction } from '@/types'

interface Props {
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
    setScreen: React.Dispatch<
        React.SetStateAction<'signIn' | 'signUp' | 'forgotPassword'>
    >
    setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function SignInForm({
    email,
    setEmail,
    password,
    setPassword,
    setScreen,
    setErrorMessage,
}: Props) {
    const { dispatch } = useAppContext()
    const [isProcessing, setIsProcessing] = useState<boolean>(false)

    const resetFields = () => {
        setEmail('')
        setPassword('')
    }

    return (
        <form
            aria-label="Sign In"
            className="space-y-6"
            onSubmit={(e) =>
                handleSignIn(
                    e,
                    email,
                    password,
                    dispatch,
                    setIsProcessing,
                    setErrorMessage,
                    resetFields
                )
            }
        >
            <Input
                id="email"
                label="Email"
                type="email"
                placeholder="name@company.com"
                hint="Fill with your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isFullWidth={true}
                isDisabled={isProcessing}
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
                isDisabled={isProcessing}
            />
            <div className="flex justify-end">
                <Link
                    title="Forgot password?"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault()
                        setScreen('forgotPassword')
                    }}
                />
            </div>
            {isProcessing ? (
                <ProcessingButton width="w-full" />
            ) : (
                <Button title="Sign In" width="w-full" isSubmit={true} />
            )}
            <div className="flex gap-1">
                <span className="text-sm font-light text-gray-900">
                    Don’t have an account yet?
                </span>
                <Link
                    title="Sign up"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault()
                        setScreen('signUp')
                    }}
                />
            </div>
        </form>
    )
}

async function handleSignIn(
    event: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
    dispatch: React.Dispatch<AppAction>,
    setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>,
    resetFields: () => void
) {
    event.preventDefault()

    setIsProcessing(true)
    const ret = await signInWithEmail(email, password)
    setIsProcessing(false)

    if (ret.type === 'success') {
        dispatch({ type: 'HIDE_LOGIN_FORM' })
        resetFields()
    } else if (ret.type === 'error') {
        switch (ret.payload) {
            case 'auth/invalid-credential':
                setErrorMessage('Invalid email or password')
                break
            case 'auth/email-unverified':
                setErrorMessage('Email not verified, please check your inbox')
                break
            default:
                setErrorMessage(
                    'An error occurred while signing in, try again later'
                )
                break
        }
    }
}
