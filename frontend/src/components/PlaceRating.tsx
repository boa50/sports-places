import { Suspense } from 'react'
import { useAppContext } from '../contexts/AppContext'
import { useSuspenseQuery } from '@tanstack/react-query'
import { reviewsQueryOptions } from '../queryOptions'
import { RatingStars } from './ui'

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
        reviewsQueryOptions(state.selectedPlace?.place_id ?? -1)
    )

    const nReviews = reviews.length

    if (nReviews === 0) return <></>

    const total =
        reviews.reduce(
            (accumulator, currentValue) => accumulator + currentValue.rating,
            0
        ) / nReviews

    return (
        <div className="flex flex-col items-center">
            <div className="text-5xl mb-2">{total.toFixed(1)}</div>
            <RatingStars rating={total} size="small" />
            <div className="text-sm text-gray-500">{nReviews} reviews</div>
        </div>
    )
}
