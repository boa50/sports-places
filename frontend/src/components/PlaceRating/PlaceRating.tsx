import { Suspense } from 'react'
import { useAppContext } from '@/contexts/AppContext'
import { useSuspenseQuery } from '@tanstack/react-query'
import { reviewsQueryOptions } from '@/queryOptions'
import { RatingStars } from '../ui'
import { averageReviews } from '@/utils'

export default function PlaceRating() {
    return (
        <Suspense>
            <PlaceRatingBuild />
        </Suspense>
    )
}

function PlaceRatingBuild() {
    const { state } = useAppContext()
    const { data: reviews } = useSuspenseQuery(
        reviewsQueryOptions(state.selectedPlace?.placeId ?? -1)
    )

    if (reviews.length === 0) return <></>

    const total = averageReviews(reviews)

    return (
        <div className="flex flex-col items-center">
            <div className="text-5xl mb-2" data-testid="total-score">
                {total.toFixed(1)}
            </div>
            <RatingStars rating={total} size="size-3.5" />
            <div className="text-sm text-gray-500" data-testid="total-reviews">
                {reviews.length} reviews
            </div>
        </div>
    )
}
