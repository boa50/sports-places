import { Marker } from 'react-leaflet'
import { useAppContext } from '../contexts/AppContext'
import type { Review as ReviewType } from '@/types'

interface Props {
    review: ReviewType
    clearNewPlace?: () => void
    hasClickAction?: boolean
}

export default function PlaceMarker({
    review,
    clearNewPlace,
    hasClickAction = true,
}: Props) {
    const { dispatch } = useAppContext()

    const handleClick = () => {
        if (!hasClickAction) return

        dispatch({
            type: 'CHANGE_SELECTED_PLACE',
            payload: `${review.lat}, ${review.lng}. Rating: ${review.rating}`,
        })
        dispatch({ type: 'OPEN_PANEL' })

        if (clearNewPlace !== undefined) {
            clearNewPlace()
        }
    }

    return (
        <Marker
            position={[review.lat, review.lng]}
            eventHandlers={{ click: handleClick }}
        />
    )
}
