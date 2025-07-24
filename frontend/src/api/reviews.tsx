import type { Review } from '../types'

export const fetchReviews = async (
    databaseUrl?: string | unknown
): Promise<Review[]> => {
    console.info('Fetching reviews...')
    const response = await fetch(`${getApiUrl(databaseUrl)}/reviews`)

    return await response.json()
}

function getApiUrl(databaseUrl?: string | unknown): string {
    const dbUrl =
        databaseUrl !== undefined
            ? typeof databaseUrl === 'string'
                ? databaseUrl
                : import.meta.env.VITE_BACKEND_URL
            : import.meta.env.VITE_BACKEND_URL

    return `${dbUrl}/api`
}
