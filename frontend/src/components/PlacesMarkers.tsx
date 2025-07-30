import { useSuspenseQuery } from '@tanstack/react-query'
import { reviewsQueryOptions } from '../queryOptions/reviews'
import PlaceMarker from './PlaceMarker'

interface Props {
    clearNewPlace?: () => void
}

export default function PlacesMarkers({ clearNewPlace }: Props) {
    const { data: reviews } = useSuspenseQuery(reviewsQueryOptions)

    return (
        <>
            {reviews.map((review, i) => (
                <PlaceMarker
                    key={i}
                    review={review}
                    clearNewPlace={clearNewPlace}
                />
            ))}
        </>
    )
}
