import { useState, useEffect } from 'react'
import L from 'leaflet'
import { Marker } from 'react-leaflet'
import { useAppContext } from '@/contexts/AppContext'
import type { Place } from '@/types'

interface Props {
    place: Place
    hasClickAction?: boolean
}

export default function PlaceMarker({ place, hasClickAction = true }: Props) {
    const { state, dispatch } = useAppContext()
    const [isSelected, setIsSelected] = useState<boolean>(
        place.placeId === state.selectedPlace?.placeId
    )

    useEffect(() => {
        setIsSelected(place.placeId === state.selectedPlace?.placeId)
    }, [state.selectedPlace])

    const handleClick = () => {
        if (!hasClickAction) return

        dispatch({
            type: 'CHANGE_SELECTED_PLACE',
            payload: place,
        })
        dispatch({ type: 'OPEN_PANEL' })
        dispatch({ type: 'HIDE_NEW_PLACE_MARKER' })
    }

    return (
        <Marker
            icon={getMarkerIcon(isSelected)}
            position={[place.lat, place.lng]}
            eventHandlers={{ click: handleClick }}
        />
    )
}

function getMarkerIcon(isSelected: boolean) {
    const className = `fill-sky-600 stroke-sky-700 stroke-5 ${isSelected ? 'brightness-125' : ''}`

    return L.divIcon({
        // svg source https://www.svgrepo.com/svg/480694/map-marker-4
        html: `
                <svg width="35" height="36" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="m 333.71871,172.49747 a 79.629326,79.629326 0 0 1 -79.62932,79.62932 79.629326,79.629326 0 0 1 -79.62933,-79.62932 79.629326,79.629326 0 0 1 79.62933,-79.629329 79.629326,79.629326 0 0 1 79.62932,79.629329 z" filter="brightness(80%)"/>
                  
                  <path d="M256,0C159.969,0,82.109,77.859,82.109,173.906c0,100.719,80.016,163.688,123.297,238.719
            C246.813,484.406,246.781,512,256,512s9.188-27.594,50.594-99.375c43.297-75.031,123.297-138,123.297-238.719
            C429.891,77.859,352.031,0,256,0z M256,240.406c-36.734,0-66.516-29.781-66.516-66.5c0-36.75,29.781-66.531,66.516-66.531
            s66.516,29.781,66.516,66.531C322.516,210.625,292.734,240.406,256,240.406z"/>
                </svg>
              `,
        className: className,
        iconSize: [35, 36],
        iconAnchor: [24, 37],
    })
}
