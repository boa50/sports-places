import { Button, Input } from '../ui'

interface Props {
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
}

export default function ForgotPasswordForm({ email, setEmail }: Props) {
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
