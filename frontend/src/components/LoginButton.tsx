import { useAppContext } from '@/contexts/AppContext'
import CustomControl from './CustomControl'
import { Button } from './ui'
import { signOutUser } from '@/auth'

export default function LoginButton() {
    const { dispatch } = useAppContext()

    return (
        <CustomControl
            position="topright"
            clearDefaultClass={false}
            customMargins={{ right: '36px', top: '12px' }}
        >
            <Button
                title="Sign in"
                onClick={() => dispatch({ type: 'SHOW_LOGIN_FORM' })}
            />
        </CustomControl>
    )
}

export function SignOutButton() {
    return (
        <CustomControl
            position="topright"
            clearDefaultClass={false}
            customMargins={{ right: '36px', top: '12px' }}
        >
            <Button title="Sign out" onClick={signOutUser} />
        </CustomControl>
    )
}
