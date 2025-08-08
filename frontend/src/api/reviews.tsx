import { getApiUrl } from './utils'
import type { Place, Review } from '../types'

export type ReviewApi = {
    user_id: number
    created_at: number
    rating: number
}

export const fetchReviews = async (place_id: number): Promise<Review[]> => {
    const response = await fetch(`${getApiUrl()}/reviews?place_id=${place_id}`)

    let reviews = await response.json()

    reviews = reviews.map((review: ReviewApi) => {
        return {
            ...review,
            created_at: new Date(review.created_at),
        }
    })

    return reviews
}

export const createReview = async (
    user_id: number,
    place: Place,
    rating: number
) => {
    const response = await fetch(`${getApiUrl()}/review`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: user_id,
            place_id: place.place_id,
            lat: place.lat,
            lng: place.lng,
            rating: rating,
        }),
    })
    if (!response.ok) {
        throw new Error('Failed to create review')
    }
    return response.json()
}
