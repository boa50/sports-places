import { useState, useEffect } from 'react'
import { createUserWithEmail } from '@/auth'
import ProcessingButton from './ProcessingButton'
import { Button, Input } from '../ui'

interface Props {
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
    errorMessage: string | undefined
    setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>
    successMessage: string | undefined
    setSuccessMessage: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function SignUpForm({
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
    successMessage,
    setSuccessMessage,
}: Props) {
    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

    useEffect(() => {
        setErrorMessage(undefined)
    }, [passwordConfirmation])

    const handleSignUp = (
        event: React.FormEvent<HTMLFormElement>,
        email: string,
        password: string,
        passwordConfirmation: string
    ) => {
        event.preventDefault()

        if (password === passwordConfirmation) {
            setIsProcessing(true)
            createUserWithEmail(
                email,
                password,
                setErrorMessage,
                setSuccessMessage,
                setIsProcessing
            )
        } else {
            setErrorMessage("Passwords don't match")
        }
    }

    return (
        <form
            className="space-y-6"
            onSubmit={(e) =>
                handleSignUp(e, email, password, passwordConfirmation)
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
                isDisabled={isProcessing || successMessage !== undefined}
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
                isDisabled={isProcessing || successMessage !== undefined}
                isCustomIvalidity={
                    errorMessage !== undefined &&
                    password !== passwordConfirmation
                }
            />
            <Input
                id="password-confirmation"
                label="Repeat your password"
                type="password"
                placeholder="••••••••"
                hint="Repeat your password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                isFullWidth={true}
                isDisabled={isProcessing || successMessage !== undefined}
                isCustomIvalidity={
                    errorMessage !== undefined &&
                    password !== passwordConfirmation
                }
            />
            {isProcessing ? (
                <ProcessingButton width="w-full" />
            ) : (
                <Button
                    title="Sign Up"
                    width="w-full"
                    isSubmit={true}
                    isDisabled={successMessage !== undefined}
                />
            )}
        </form>
    )
}
