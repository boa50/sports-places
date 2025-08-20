import { useState } from 'react'
import { resetPassword } from '@/auth'
import ProcessingButton from './ProcessingButton'
import { Button, Input } from '../ui'

interface Props {
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>
    successMessage: string | undefined
    setSuccessMessage: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function ForgotPasswordForm({
    email,
    setEmail,
    setErrorMessage,
    successMessage,
    setSuccessMessage,
}: Props) {
    const [isProcessing, setIsProcessing] = useState<boolean>(false)

    const handlePasswordReset = (
        event: React.FormEvent<HTMLFormElement>,
        email: string
    ) => {
        event.preventDefault()

        setIsProcessing(true)
        resetPassword(
            email,
            setSuccessMessage,
            setErrorMessage,
            setIsProcessing
        )
    }

    return (
        <form
            className="space-y-6"
            onSubmit={(e) => handlePasswordReset(e, email)}
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
            {isProcessing ? (
                <ProcessingButton width="w-full" />
            ) : (
                <Button
                    title="Reset Password"
                    width="w-full"
                    isSubmit={true}
                    isDisabled={successMessage !== undefined}
                />
            )}
        </form>
    )
}
