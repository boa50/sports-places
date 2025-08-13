import { getApiUrl } from './utils'

export const validateRouteLink = async (url: string): Promise<boolean> => {
    const response = await fetch(`${getApiUrl()}/checkLink?url=${url}`)

    const isTrusted: { trusted: boolean } = await response.json()

    return isTrusted['trusted']
}
