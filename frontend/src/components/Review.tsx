import { Marker } from 'react-leaflet'
import type { Review as ReviewType } from '@/types'

interface Props {
    review: ReviewType
    openPanel: () => void
    setSelectedPlace: (place: string) => void
}

export default function Review({ review, openPanel, setSelectedPlace }: Props) {
    const handleClick = () => {
        setSelectedPlace(`${review.lat}, ${review.long}`)
        openPanel()
    }

    return (
        <Marker
            position={[review.lat, review.long]}
            eventHandlers={{ click: handleClick }}
        />
    )
}
