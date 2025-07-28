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
            payload: `${review.lat}, ${review.long}`,
        })
        dispatch({ type: 'OPEN_PANEL' })
    }

    return (
        <Marker
            position={[review.lat, review.long]}
            eventHandlers={{ click: handleClick }}
        />
    )
}
