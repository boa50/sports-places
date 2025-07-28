import { useSuspenseQuery } from '@tanstack/react-query'
import { reviewsQueryOptions } from '../queryOptions/reviews'
import Review from '../components/Review'

interface Props {
    openPanel: () => void
    setSelectedPlace: (place: string) => void
}

export default function ReviewsMarkers({ openPanel, setSelectedPlace }: Props) {
    const { data: reviews } = useSuspenseQuery(reviewsQueryOptions)

    return (
        <>
            {reviews.map((review, i) => (
                <Review
                    key={i}
                    review={review}
                    openPanel={openPanel}
                    setSelectedPlace={setSelectedPlace}
                />
            ))}
        </>
    )
}
