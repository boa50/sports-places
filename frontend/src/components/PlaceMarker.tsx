import { Marker } from 'react-leaflet'
import { useAppContext } from '../contexts/AppContext'
import type { Place } from '../types'

interface Props {
    place: Place
    hasClickAction?: boolean
}

export default function PlaceMarker({ place, hasClickAction = true }: Props) {
    const { dispatch } = useAppContext()

    const handleClick = () => {
        if (!hasClickAction) return

        dispatch({
            type: 'CHANGE_SELECTED_PLACE',
            payload: `${place.place_id}`,
        })
        dispatch({ type: 'OPEN_PANEL' })
        dispatch({ type: 'HIDE_NEW_PLACE_MARKER' })
    }

    return (
        <Marker
            position={[place.lat, place.lng]}
            eventHandlers={{ click: handleClick }}
        />
    )
}
