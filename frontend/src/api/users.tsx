import { getApiUrl } from './utils'
import type { User } from '@/types'

type UserApi = {
    user_id: number
    avatar: string
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
            avatar: 'default',
            displayName: 'User',
        }

    return {
        userId: user[0].user_id,
        avatar: user[0].avatar,
        displayName: user[0].display_name,
    }
}

// export const updateUserAvatar = async (userId: number, avatar: string) => {
//     const response = await fetch(`${getApiUrl()}/user/${userId}/?avatar=${avatar}`)

// }

// export const updateUserDisplayName = async (userId: number, displayName: string) => {
//     const response = await fetch(`${getApiUrl()}/user/${userId}/?display_name=${displayName}`)
// }
