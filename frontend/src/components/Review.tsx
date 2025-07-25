import { Marker, Popup } from 'react-leaflet'
import type { Review as ReviewType } from '@/types'

interface Props {
    review: ReviewType
}

export default function Review({ review }: Props) {
    return (
        <Marker position={[review.lat, review.long]}>
            <Popup>{review.txt}</Popup>
        </Marker>
    )
}
