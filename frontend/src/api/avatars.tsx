import { getApiUrl } from './utils'
import type { Avatar } from '@/types'

export const fetchAvatars = async (): Promise<Avatar[]> => {
    const response = await fetch(`${getApiUrl()}/avatars`)
    const avatars = await response.json()

    return avatars
}

export const fetchAvatarUrl = async (description: string): Promise<string> => {
    const response = await fetch(
        `${getApiUrl()}/avatarUrl?avatar_description=${description}`
    )
    const ret = await response.json()

    if (ret.url === undefined) return 'default'

    return ret.url
}
