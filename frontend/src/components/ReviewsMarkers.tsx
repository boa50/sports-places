import { useSuspenseQuery } from '@tanstack/react-query'
import { reviewsQueryOptions } from '../queryOptions/reviews'
import Review from '../components/Review'

export default function ReviewsMarkers() {
    const { data: reviews } = useSuspenseQuery(reviewsQueryOptions)

    return (
        <>
            {reviews.map((review, i) => (
                <Review key={i} review={review} />
            ))}
        </>
    )
}
