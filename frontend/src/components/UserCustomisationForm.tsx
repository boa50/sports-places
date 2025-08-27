import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAppContext } from '@/contexts/AppContext'
import { getCurrentUser } from '@/auth'
import { createUser } from '@/api'
import { defaults } from './defaults'
import { FormModal, Input, Button, ProcessingButton } from './ui'
import UserAvatar from './UserAvatar'

export default function UserCustomisationForm() {
    const { state, dispatch } = useAppContext()
    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [displayName, setDisplayName] = useState<string>('')
    const [selectedAvatar, setSelectedAvatar] = useState<string>('default')

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
            closeModal={handleCancel}
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
                />
                <Avatars
                    selectedAvatar={selectedAvatar}
                    handleChange={handleAvatarChange}
                />
                <Buttons
                    isProcessing={isProcessing}
                    handleCancel={handleCancel}
                />
            </form>
        </FormModal>
    )
}

interface AvatarsProps {
    selectedAvatar: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Avatars({ selectedAvatar, handleChange }: AvatarsProps) {
    const availableAvatars = [
        { type: 'default', url: 'default' },
        { type: 'red', url: 'https://i.ibb.co/C5prjF4G/red.webp' },
        { type: 'green', url: 'https://i.ibb.co/WWDgDSSh/green.webp' },
        { type: 'blue', url: 'https://i.ibb.co/VWy8KXTN/blue.webp' },
    ]

    return (
        <div className="flex flex-col gap-4">
            <div className="text-sm font-medium text-gray-900">
                Display Picture
            </div>
            <div className="flex justify-around">
                {availableAvatars.map((d, i) => (
                    <div key={i}>
                        <input
                            type="radio"
                            id={`value-${d.type}`}
                            name="ratingStarsRadio"
                            value={d.type}
                            checked={selectedAvatar === d.type}
                            onChange={handleChange}
                            className="hidden peer"
                        />
                        <label
                            htmlFor={`value-${d.type}`}
                            className="cursor-pointer"
                        >
                            <div
                                className={
                                    selectedAvatar === d.type
                                        ? 'ring-5 ring-sky-600/70 rounded-full'
                                        : ''
                                }
                            >
                                <UserAvatar size="big" avatarUrl={d.url} />
                            </div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

interface ButtonsProps {
    isProcessing: boolean
    handleCancel: () => void
}

export function Buttons({ isProcessing, handleCancel }: ButtonsProps) {
    const btnWidth = 'w-28'
    const containerClass = 'flex gap-2 justify-end mt-10'

    return isProcessing ? (
        <div className={containerClass}>
            <Button
                title="Cancel"
                isSecondary={true}
                isDisabled={true}
                width={btnWidth}
            />
            <ProcessingButton width={btnWidth} />
        </div>
    ) : (
        <div className={containerClass}>
            <Button
                title="Cancel"
                isSecondary={true}
                onClick={handleCancel}
                width={btnWidth}
            />
            <Button title="Save Changes" isSubmit={true} width={btnWidth} />
        </div>
    )
}
