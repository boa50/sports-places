import { Button, Input, Link } from '../ui'

interface Props {
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
    setScreen: React.Dispatch<
        React.SetStateAction<'signIn' | 'signUp' | 'forgotPassword'>
    >
}

export default function SignInForm({
    email,
    setEmail,
    password,
    setPassword,
    setScreen,
}: Props) {
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
