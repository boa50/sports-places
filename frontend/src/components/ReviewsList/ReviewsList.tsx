import { Suspense } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useAppContext } from '@/contexts/AppContext'
import { reviewsQueryOptions } from '@/queryOptions'
import { Spinner } from '../ui'
import Review from '../Review'

export default function ReviewsList() {
    return (
        <Suspense
            fallback={
                <div className="flex justify-center py-3">
                    <Spinner />
                </div>
            }
        >
            <ReviewsListBuild />
        </Suspense>
    )
}

function ReviewsListBuild() {
    const { state } = useAppContext()
    const { data: reviews } = useSuspenseQuery(
        reviewsQueryOptions(state.selectedPlace?.placeId ?? -1)
    )

    return (
        <ul className="flex-1 h-full divide-y divide-gray-200">
            {reviews.map((review, i) => (
                <li key={i} className="w-full px-6 py-3">
                    <Review review={review} />
                </li>
            ))}
        </ul>
    )
}
