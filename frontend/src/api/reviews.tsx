import { getApiUrl } from './utils'
import type { Place, Review } from '@/types'

export type ReviewApi = {
    user_display_name: string
    user_avatar_description: string
    experience_date: number
    rating: number
    route_link?: string
    route_link_trusted?: boolean
}

export const fetchReviews = async (place_id: number): Promise<Review[]> => {
    const response = await fetch(`${getApiUrl()}/reviews?place_id=${place_id}`)

    let reviews = await response.json()

    reviews = reviews.map((review: ReviewApi) => {
        return {
            userDisplayName: review.user_display_name,
            userAvatarDescription: review.user_avatar_description,
            experienceDate: new Date(review.experience_date),
            rating: review.rating,
            routeLink: review.route_link,
            routeLinkTrusted: review.route_link_trusted,
        }
    })

    return reviews
}

export const createReview = async (
    userId: number,
    place: Place,
    experienceDate: string,
    rating: number,
    routeLink: string | null
) => {
    const response = await fetch(`${getApiUrl()}/review`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: userId,
            place_id: place.placeId,
            lat: place.lat,
            lng: place.lng,
            experience_date: experienceDate,
            rating: rating,
            route_link: routeLink,
        }),
    })
    if (!response.ok) {
        throw new Error('Failed to create review')
    }
    return response.json()
}
