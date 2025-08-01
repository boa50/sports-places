import { queryOptions } from '@tanstack/react-query'
import { fetchPlaces, fetchReviews } from '../api'

export const placesQueryOptions = queryOptions({
    queryKey: ['places'],
    queryFn: () => fetchPlaces(),
})

export const reviewsQueryOptions = (place_id: number) =>
    queryOptions({
        queryKey: ['reviews', place_id],
        queryFn: () => fetchReviews(place_id),
    })
