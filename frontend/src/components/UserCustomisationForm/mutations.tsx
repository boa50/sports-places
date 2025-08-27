import { useMutation } from '@tanstack/react-query'
import { getCurrentUser } from '@/auth'
import { createUser } from '@/api'
import { defaults } from '../defaults'
import type { QueryClient } from '@tanstack/react-query'
import type { AppAction } from '@/types'

export const createUserMutation = (
    dispatch: React.Dispatch<AppAction>,
    queryClient: QueryClient,
    setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>
) =>
    useMutation({
        mutationFn: (user: { avatar: string; displayName: string }) =>
            createUser(
                getCurrentUser()?.uid ?? '',
                user.avatar,
                user.displayName
            ),
        onSuccess: () => {
            dispatch({ type: 'HIDE_USER_CUSTOMISATION_FORM' })
            dispatch({
                type: 'SHOW_ALERT_SCREEN',
                payload: {
                    message: 'User preferences changed',
                    type: 'success',
                    timeToHide: defaults.alertScreenTimeToHide,
                },
            })

            queryClient.invalidateQueries({
                queryKey: ['user', getCurrentUser()?.uid],
            })

            setIsProcessing(false)
        },
        onError: () => {
            dispatch({
                type: 'SHOW_ALERT_SCREEN',
                payload: {
                    message:
                        'Failed to customise user preferences, try again later',
                    type: 'error',
                    timeToHide: defaults.alertScreenTimeToHide,
                },
            })

            setIsProcessing(false)
        },
    })
