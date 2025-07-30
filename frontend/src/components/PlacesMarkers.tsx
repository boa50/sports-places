import { useSuspenseQuery } from '@tanstack/react-query'
import { reviewsQueryOptions } from '../queryOptions/reviews'
import PlaceMarker from './PlaceMarker'

export default function PlacesMarkers() {
    const { data: reviews } = useSuspenseQuery(reviewsQueryOptions)

    return (
        <>
            {reviews.map((review, i) => (
                <PlaceMarker key={i} review={review} />
            ))}
        </>
    )
}
