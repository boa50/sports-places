import { useState } from 'react'
import { createUserWithEmail } from '@/auth'
import ProcessingButton from './ProcessingButton'
import { Button, Input } from '../ui'

interface Props {
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
    setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function SignUpForm({
    email,
    setEmail,
    password,
    setPassword,
    setErrorMessage,
}: Props) {
    const [isProcessing, setIsProcessing] = useState<boolean>(false)

    const handleSignUp = (email: string, password: string) => {
        setIsProcessing(true)
        createUserWithEmail(email, password, setErrorMessage, setIsProcessing)
    }

    return (
        <form
            className="space-y-6"
            action={() => handleSignUp(email, password)}
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
            {isProcessing ? (
                <ProcessingButton width="w-full" />
            ) : (
                <Button title="Sign Up" width="w-full" isSubmit={true} />
            )}
        </form>
    )
}
