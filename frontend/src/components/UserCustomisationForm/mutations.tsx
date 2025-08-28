import { useMutation } from '@tanstack/react-query'
import { getCurrentUser } from '@/auth'
import { createUser, updateUser } from '@/api'
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
            successProcedure(dispatch, queryClient, setIsProcessing)
        },
        onError: () => {
            errorProcedure(dispatch, setIsProcessing)
        },
    })

export const updateUserMutation = (
    dispatch: React.Dispatch<AppAction>,
    queryClient: QueryClient,
    setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>
) =>
    useMutation({
        mutationFn: (user: {
            userId: number
            avatar: string
            displayName: string
        }) => updateUser(user.userId, user.avatar, user.displayName),
        onSuccess: () => {
            successProcedure(dispatch, queryClient, setIsProcessing)
        },
        onError: () => {
            errorProcedure(dispatch, setIsProcessing)
        },
    })

function successProcedure(
    dispatch: React.Dispatch<AppAction>,
    queryClient: QueryClient,
    setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>
) {
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
}

function errorProcedure(
    dispatch: React.Dispatch<AppAction>,
    setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>
) {
    dispatch({
        type: 'SHOW_ALERT_SCREEN',
        payload: {
            message: 'Failed to customise user preferences, try again later',
            type: 'error',
            timeToHide: defaults.alertScreenTimeToHide,
        },
    })

    setIsProcessing(false)
}
