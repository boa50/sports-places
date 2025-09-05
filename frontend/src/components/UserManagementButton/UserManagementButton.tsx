import { useAppContext } from '@/contexts/AppContext'
import CustomControl from '../CustomControl'
import UserAvatar from '../UserAvatar'
import { getCurrentUser } from '@/auth'
import { useQuery } from '@tanstack/react-query'
import { userQueryOptions } from '@/queryOptions'
import { Button } from '../ui'

export default function UserManagementButton() {
    const { state, dispatch } = useAppContext()
    const { data: userData } = useQuery(userQueryOptions(getCurrentUser()?.uid))

    return (
        <CustomControl
            childrenState={userData?.avatarUrl}
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
                        avatarUrl={userData?.avatarUrl}
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
    avatarUrl?: string
}

function UserButton({ showUserPanel, avatarUrl }: UserButtonProps) {
    return (
        <button
            title="User"
            aria-label="User"
            className="rounded-full cursor-pointer"
            onClick={showUserPanel}
        >
            <UserAvatar size="small" avatarUrl={avatarUrl ?? 'default'} />
        </button>
    )
}
