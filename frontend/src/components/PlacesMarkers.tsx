import { Suspense } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { reviewsQueryOptions } from '../queryOptions/reviews'
import PlaceMarker from './PlaceMarker'

export default function PlacesMarkers() {
    return (
        <Suspense>
            <PlacesMarkersBuild />
        </Suspense>
    )
}

function PlacesMarkersBuild() {
    const { data: reviews } = useSuspenseQuery(reviewsQueryOptions)

    return (
        <>
            {reviews.map((review, i) => (
                <PlaceMarker key={i} review={review} />
            ))}
        </>
    )
}
