import { getApiUrl } from './utils'
import type { Place, Review } from '../types'

export type ReviewApi = {
    user_id: number
    experience_date: number
    rating: number
}

export const fetchReviews = async (place_id: number): Promise<Review[]> => {
    const response = await fetch(`${getApiUrl()}/reviews?place_id=${place_id}`)

    let reviews = await response.json()

    reviews = reviews.map((review: ReviewApi) => {
        return {
            ...review,
            experience_date: new Date(review.experience_date),
        }
    })

    return reviews
}

export const createReview = async (
    user_id: number,
    place: Place,
    experience_date: string,
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
            experience_date: experience_date,
            rating: rating,
        }),
    })
    if (!response.ok) {
        throw new Error('Failed to create review')
    }
    return response.json()
}
