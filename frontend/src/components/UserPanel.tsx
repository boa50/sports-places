import { useAppContext } from '@/contexts/AppContext'
import { getCurrentUser, signOutUser } from '@/auth'
import { HandleOutsideClick, Button, Icon } from './ui'

export default function UserPanel() {
    const { state, dispatch } = useAppContext()

    const user = getCurrentUser()
    const email = user?.email

    const handleSignOut = () => {
        dispatch({ type: 'HIDE_USER_PANEL' })
        signOutUser()
    }

    return (
        state.isUserPanelOpen && (
            <HandleOutsideClick
                action={() => dispatch({ type: 'HIDE_USER_PANEL' })}
            >
                <div className="absolute right-0 top-0 z-1000 w-fit h-fit mr-8 mt-18">
                    <div className="flex flex-col bg-gray-200 p-4 gap-6 w-xs rounded-xl shadow-sm/30">
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex w-full justify-between">
                                <div className="size-6"></div>
                                <h6 className="text-sm font-bold">{email}</h6>
                                <button
                                    type="button"
                                    aria-label="Close"
                                    title="Close"
                                    className="cursor-pointer text-gray-900 hover:text-sky-800"
                                >
                                    <Icon type="x" size="size-6" />
                                </button>
                            </div>
                            <div className="bg-gray-400 text-gray-100 p-1.5 rounded-full cursor-pointer">
                                <Icon type="user" size="size-14" />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button
                                onClick={handleSignOut}
                                title="SignOut"
                                isSecondary={true}
                                icon="signOut"
                            />
                        </div>
                    </div>
                </div>
            </HandleOutsideClick>
        )
    )
}
