import { getApiUrl } from './utils'
import type { User } from '@/types'

type UserApi = {
    user_id: number
    avatar_url: string
    display_name: string
}

export const createUser = async (
    userProviderId: string,
    avatar: string,
    displayName: string
) => {
    const response = await fetch(`${getApiUrl()}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_provider_id: userProviderId,
            avatar: avatar,
            display_name: displayName,
        }),
    })

    if (!response.ok) {
        throw new Error('Failed to create a new user')
    }

    return response.json()
}

export const fetchUser = async (userProviderId: string): Promise<User> => {
    const response = await fetch(
        `${getApiUrl()}/users?user_provider_id=${userProviderId}`
    )

    let user: UserApi[] = await response.json()

    if (user.length === 0)
        return {
            userId: -1,
            avatarUrl: 'default',
            displayName: 'User',
        }

    return {
        userId: user[0].user_id,
        avatarUrl: user[0].avatar_url,
        displayName: user[0].display_name,
    }
}

export const updateUser = async (
    userId: number,
    avatar: string,
    displayName: string
) => {
    const response = await fetch(`${getApiUrl()}/userUpdate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: userId,
            avatar: avatar,
            display_name: displayName,
        }),
    })

    if (!response.ok) {
        throw new Error('Failed to update the user')
    }

    return response.json()
}
