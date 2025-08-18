import { useAppContext } from '@/contexts/AppContext'
import CustomControl from './CustomControl'
import { Button } from './ui'

export default function LoginButton() {
    const { dispatch } = useAppContext()

    return (
        <CustomControl position="topright" clearDefaultClass={false}>
            <Button
                title="Sign in"
                onClick={() => dispatch({ type: 'SHOW_LOGIN_FORM' })}
            />
        </CustomControl>
    )
}
