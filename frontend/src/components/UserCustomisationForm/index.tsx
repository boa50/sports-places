import { useState, useEffect } from 'react'
import { useAppContext } from '@/contexts/AppContext'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { userQueryOptions, avatarsQueryOptions } from '@/queryOptions'
import { getCurrentUser } from '@/auth'
import { FormModal, Input } from '../ui'
import Avatars from './Avatars'
import Buttons from './Buttons'
import { createUserMutation, updateUserMutation } from './mutations'
import type { User } from '@/types'

export default function UserCustomisationForm() {
    const { state, dispatch } = useAppContext()
    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [displayName, setDisplayName] = useState<string>('')
    const [selectedAvatar, setSelectedAvatar] = useState<string>('default')
    const [isNewUser, setIsNewUser] = useState<boolean>(false)

    const queryClient = useQueryClient()
    const { data: userData } = useQuery(userQueryOptions(getCurrentUser()?.uid))
    const { data: avatarsData } = useQuery(avatarsQueryOptions())

    const createUser = createUserMutation(
        dispatch,
        queryClient,
        setIsProcessing
    )

    const updateUser = updateUserMutation(
        dispatch,
        queryClient,
        setIsProcessing
    )

    const resetUserState = (userData: User | undefined) => {
        if (userData !== undefined) {
            setDisplayName(userData.displayName)

            setSelectedAvatar('default')
            if (avatarsData !== undefined)
                avatarsData.forEach((avatar) => {
                    if (avatar.url === userData.avatarUrl)
                        setSelectedAvatar(avatar.description)
                })
        }
    }

    useEffect(() => {
        if (userData === undefined || userData?.userId === -1) {
            setDisplayName(
                'Name ' + Math.floor(Math.random() * (999999 - 0 + 1))
            )
            setSelectedAvatar('default')
            setIsNewUser(true)
        } else {
            setIsNewUser(false)
            resetUserState(userData)
        }
    }, [userData, avatarsData])

    const handleCancel = () => {
        dispatch({ type: 'HIDE_USER_CUSTOMISATION_FORM' })
        resetUserState(userData)
    }

    const handleClose = () => {
        if (isProcessing) return

        dispatch({ type: 'HIDE_USER_CUSTOMISATION_FORM' })

        if (isNewUser)
            createUser.mutate({
                avatar: selectedAvatar,
                displayName: displayName,
            })
        else resetUserState(userData)
    }

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>,
        displayName: string,
        avatar: string
    ) => {
        event.preventDefault()
        setIsProcessing(true)

        if (isNewUser) {
            createUser.mutate({
                avatar: avatar,
                displayName: displayName,
            })
        } else {
            updateUser.mutate({
                userId: userData?.userId ?? -1,
                avatar: avatar,
                displayName: displayName,
            })
        }
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
