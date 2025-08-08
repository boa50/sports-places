import Review from './Review'
import { useSuspenseQuery } from '@tanstack/react-query'
import { reviewsQueryOptions } from '../queryOptions'
import { Suspense } from 'react'
import { useAppContext } from '../contexts/AppContext'
import { Spinner } from './ui'

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
        reviewsQueryOptions(state.selectedPlace?.place_id ?? -1)
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
