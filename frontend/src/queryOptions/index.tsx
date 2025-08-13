import { queryOptions } from '@tanstack/react-query'
import { fetchPlaces, fetchReviews, validateRouteLink } from '../api'

export const placesQueryOptions = queryOptions({
    queryKey: ['places'],
    queryFn: () => fetchPlaces(),
})

export const reviewsQueryOptions = (placeId: number) =>
    queryOptions({
        queryKey: ['reviews', placeId],
        queryFn: () => fetchReviews(placeId),
    })

export const validateRouteLinkQueryOptions = (url: string) =>
    queryOptions({
        queryKey: ['validateRouteLink', url],
        queryFn: () => (url !== '' ? validateRouteLink(url) : true),
    })
