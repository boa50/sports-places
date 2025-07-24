import { queryOptions } from '@tanstack/react-query'
import { fetchReviews } from '../api/reviews'

export const reviewsQueryOptions = queryOptions({
    queryKey: ['reviews'],
    queryFn: () => fetchReviews(),
})
