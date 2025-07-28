import type { Review } from '../types'

export const fetchReviews = async (): Promise<Review[]> => {
    console.info('Fetching reviews...')
    const response = await fetch(`${getApiUrl()}/reviews`)

    return await response.json()
}

export const createReview = async () => {
    const response = await fetch(`${getApiUrl()}/review`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: -1, lat: 0, long: 0, txt: 'test' }),
    })
    if (!response.ok) {
        throw new Error('Failed to create review')
    }
    return response.json()
}

function getApiUrl(): string {
    return `${import.meta.env.VITE_BACKEND_URL}/api`
}
