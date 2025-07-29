import { Marker } from 'react-leaflet'
import { useAppContext } from '../contexts/AppContext'
import type { Review as ReviewType } from '@/types'

interface Props {
    review: ReviewType
}

export default function Review({ review }: Props) {
    const { dispatch } = useAppContext()

    const handleClick = () => {
        dispatch({
            type: 'CHANGE_SELECTED_PLACE',
            payload: `${review.lat}, ${review.lng}. Rating: ${review.rating}`,
        })
        dispatch({ type: 'OPEN_PANEL' })
    }

    return (
        <Marker
            position={[review.lat, review.lng]}
            eventHandlers={{ click: handleClick }}
        />
    )
}
