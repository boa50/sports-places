import { getCurrentUser } from '@/auth'
import { useSuspenseQuery } from '@tanstack/react-query'
import { userQueryOptions } from '@/queryOptions'
import { Suspense } from 'react'
import { Icon } from './ui'

interface Props {
    size: 'small' | 'medium' | 'big'
    type?: string
}

export default function UserAvatar({ size, type }: Props) {
    return (
        <Suspense fallback={<DefaultAvatar size={size} />}>
            <Avatar size={size} type={type} />
        </Suspense>
    )
}

function DefaultAvatar({ size }: { size: 'small' | 'medium' | 'big' }) {
    return (
        <div className="bg-gray-400 text-gray-100 p-1.5 rounded-full">
            <Icon type="user" size={getCssSize(size, true)} />
        </div>
    )
}

function Avatar({
    size,
    type,
}: {
    size: 'small' | 'medium' | 'big'
    type?: string
}) {
    const { data: userData } =
        type === undefined
            ? useSuspenseQuery(userQueryOptions(getCurrentUser()?.uid))
            : { data: { avatarUrl: type } }

    return userData?.avatarUrl === 'default' ? (
        <DefaultAvatar size={size} />
    ) : (
        <img
            src={userData?.avatarUrl}
            className={`${getCssSize(size, false)} rounded-full`}
        />
    )
}

function getCssSize(size: 'small' | 'medium' | 'big', isDefault: boolean) {
    switch (size) {
        case 'small':
            return isDefault ? 'size-5' : 'size-8'
        case 'medium':
            return isDefault ? 'size-8' : 'size-11'
        case 'big':
            return isDefault ? 'size-14' : 'size-17'
        default:
            return isDefault ? 'size-8' : 'size-11'
    }
}
