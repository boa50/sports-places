import { useState } from 'react'
import { useAppContext } from '@/contexts/AppContext'
import { Button, FormModal, Input, Link } from './ui'

export default function LoginForm() {
    const { state, dispatch } = useAppContext()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleCloseModal = () => {
        dispatch({ type: 'HIDE_LOGIN_FORM' })
        setEmail('')
        setPassword('')
    }

    return (
        <FormModal
            title="Sign in to your account"
            isModalOpen={state.isLoginFormOpen}
            closeModal={handleCloseModal}
        >
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
                    <Link title="Forgot password?" url="#" />
                </div>
                <Button title="Sign in" width="w-full" isSubmit={true} />
                <div className="flex gap-1">
                    <span className="text-sm font-light text-gray-900">
                        Don’t have an account yet?
                    </span>
                    <Link title="Sign up" url="#" />
                </div>
            </form>
        </FormModal>
    )
}
