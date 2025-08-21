import { useAppContext } from '@/contexts/AppContext'
import CustomControl from './CustomControl'
import { Button, Icon } from './ui'

export default function UserManagementButton() {
    const { state, dispatch } = useAppContext()

    return (
        <CustomControl
            childrenState={state.isUserSignedIn}
            position="topright"
            clearDefaultClass={false}
            customMargins={{ right: '36px', top: '12px' }}
        >
            {state.isUserSignedIn !== undefined ? (
                state.isUserSignedIn ? (
                    <UserButton
                        showUserPanel={() =>
                            dispatch({ type: 'SHOW_USER_PANEL' })
                        }
                    />
                ) : (
                    <Button
                        title="Sign in"
                        width="w-24"
                        onClick={() => dispatch({ type: 'SHOW_LOGIN_FORM' })}
                        icon="signIn"
                    />
                )
            ) : (
                <></>
            )}
        </CustomControl>
    )
}

interface UserButtonProps {
    showUserPanel: () => void
}

function UserButton({ showUserPanel }: UserButtonProps) {
    return (
        <button
            title="User"
            aria-label="User"
            className="bg-gray-400 text-gray-100 p-1.5 rounded-full cursor-pointer"
            onClick={showUserPanel}
        >
            <Icon type="user" size="size-5" />
        </button>
    )
}
