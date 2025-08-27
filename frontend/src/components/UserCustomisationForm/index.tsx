import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAppContext } from '@/contexts/AppContext'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { userQueryOptions, avatarsQueryOptions } from '@/queryOptions'
import { getCurrentUser } from '@/auth'
import { createUser } from '@/api'
import { defaults } from '../defaults'
import { FormModal, Input } from '../ui'
import Avatars from './Avatars'
import Buttons from './Buttons'

export default function UserCustomisationForm() {
    const { state, dispatch } = useAppContext()
    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [displayName, setDisplayName] = useState<string>('')
    const [selectedAvatar, setSelectedAvatar] = useState<string>('default')
    const [isNewUser, setIsNewUser] = useState<boolean>(false)

    const queryClient = useQueryClient()
    const { data: userData } = useQuery(userQueryOptions(getCurrentUser()?.uid))
    const { data: avatarsData } = useQuery(avatarsQueryOptions())

    useEffect(() => {
        if (userData === undefined || userData?.userId === -1) {
            setDisplayName(
                'Name ' + Math.floor(Math.random() * (999999 - 0 + 1))
            )
            setSelectedAvatar('default')
            setIsNewUser(true)
        } else {
            setDisplayName(userData.displayName)

            setSelectedAvatar('default')
            if (avatarsData !== undefined)
                avatarsData.forEach((avatar) => {
                    if (avatar.url === userData.avatarUrl)
                        setSelectedAvatar(avatar.description)
                })
        }
    }, [userData, avatarsData])

    const createUserMutation = useMutation({
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

    const handleCancel = () => {
        dispatch({ type: 'HIDE_USER_CUSTOMISATION_FORM' })
    }

    const handleClose = () => {
        dispatch({ type: 'HIDE_USER_CUSTOMISATION_FORM' })

        if (isNewUser)
            createUserMutation.mutate({
                avatar: selectedAvatar,
                displayName: displayName,
            })
    }

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>,
        displayName: string,
        avatar: string
    ) => {
        event.preventDefault()

        setIsProcessing(true)
        createUserMutation.mutate({
            avatar: avatar,
            displayName: displayName,
        })
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSelectedAvatar(e.target.value)
    }

    return (
        <FormModal
            title={'Change your preferences'}
            isModalOpen={state.isUserCustomisationFormOpen}
            closeModal={handleClose}
        >
            <form
                className="space-y-6"
                onSubmit={(e) => handleSubmit(e, displayName, selectedAvatar)}
            >
                <Input
                    id="display-name"
                    label="Display Name"
                    type="text"
                    placeholder="Some nice name"
                    hint="Fill with your display name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    isFullWidth={true}
                    isDisabled={isProcessing}
                    maxLength={25}
                />
                <Avatars
                    selectedAvatar={selectedAvatar}
                    handleChange={handleAvatarChange}
                />
                <Buttons
                    isProcessing={isProcessing}
                    handleCancel={handleCancel}
                    isNewUser={isNewUser}
                />
            </form>
        </FormModal>
    )
}
