import { useState } from 'react'
import { signInWithEmail } from '@/auth'
import ProcessingButton from './ProcessingButton'
import { Button, Input, Link } from '../ui'

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
    const [isProcessing, setIsProcessing] = useState<boolean>(false)

    const handleSignUp = (
        event: React.FormEvent<HTMLFormElement>,
        email: string,
        password: string
    ) => {
        event.preventDefault()

        setIsProcessing(true)
        signInWithEmail(email, password, setErrorMessage, setIsProcessing)
    }

    return (
        <form
            className="space-y-6"
            onSubmit={(e) => handleSignUp(e, email, password)}
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
                    onClick={() => setScreen('forgotPassword')}
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
                <Link title="Sign up" onClick={() => setScreen('signUp')} />
            </div>
        </form>
    )
}
