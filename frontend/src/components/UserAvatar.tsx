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
    let cssSize = ''

    switch (size) {
        case 'small':
            cssSize = 'size-5'
            break
        case 'medium':
            cssSize = 'size-8'
            break
        case 'big':
            cssSize = 'size-14'
            break

        default:
            cssSize = 'size-8'
            break
    }

    return (
        <div className="bg-gray-400 text-gray-100 p-1.5 rounded-full">
            <Icon type="user" size={cssSize} />
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
            : { data: { avatar: type } }

    return userData?.avatar === 'default' ? (
        <DefaultAvatar size={size} />
    ) : (
        <></>
    )
}
