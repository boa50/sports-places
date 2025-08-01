import { getApiUrl } from './utils'
import type { Review } from '../types'

export const fetchReviews = async (place_id: number): Promise<Review[]> => {
    const response = await fetch(`${getApiUrl()}/reviews?place_id=${place_id}`)

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
