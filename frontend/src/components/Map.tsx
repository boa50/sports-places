import { useState } from 'react'
import { useAppContext } from '../contexts/AppContext'
import {
    MapContainer,
    TileLayer,
    ZoomControl,
    ScaleControl,
    useMapEvent,
    useMapEvents,
} from 'react-leaflet'
import { latLngBounds, latLng } from 'leaflet'
import { defaults } from './defaults'
import PlaceMarker from './PlaceMarker'
import RecenterMapButton from '../components/RecenterMapButton'
import PlacesMarkers from './PlacesMarkers'

import type { LatLng } from 'leaflet'
import type { Place } from '../types'

function ClickHandler({
    onMapClick,
}: {
    onMapClick: (latlng: LatLng) => void
}) {
    useMapEvent('click', (e) => {
        onMapClick(e.latlng)
    })
    return null
}

interface Props {
    userLocation?: { latitude: number; longitude: number }
}

export default function Map({ userLocation }: Props) {
    const { state, dispatch } = useAppContext()
    const maxBounds = latLngBounds(latLng(-90, -Infinity), latLng(90, Infinity))
    const [markerPlace, setMarkerPlace] = useState<Place | null>(null)

    const handleMapClick = (latlng: LatLng) => {
        const place = {
            place_id: -1,
            lat: latlng.lat,
            lng: latlng.lng,
        }
        setMarkerPlace(place)

        dispatch({
            type: 'CHANGE_SELECTED_PLACE',
            payload: place,
        })

        dispatch({ type: 'SHOW_NEW_PLACE_MARKER' })
        dispatch({ type: 'OPEN_PANEL' })
    }

    return (
        <MapContainer
            className="h-dvh"
            center={[
                userLocation ? userLocation.latitude : defaults.latitude,
                userLocation ? userLocation.longitude : defaults.longitude,
            ]}
            zoom={userLocation ? defaults.usersZoom : defaults.zoom}
            minZoom={defaults.zoom}
            scrollWheelZoom={true}
            zoomControl={false}
            maxBounds={maxBounds}
            maxBoundsViscosity={1.0}
        >
            <MapComponents />

            <ClickHandler onMapClick={handleMapClick} />

            <NewPlaceMarker
                markerPlace={markerPlace}
                isShowNewPlaceMarker={state.isShowNewPlaceMarker}
            />
        </MapContainer>
    )
}

function MapComponents() {
    const [isLocationAllowed, setIsLocationAllowed] = useState<
        boolean | undefined
    >(undefined)

    const map = useMapEvents({
        locationfound: (location) => {
            setIsLocationAllowed(true)
            map.flyTo(
                [location.latlng.lat, location.latlng.lng],
                defaults.usersZoom
            )
        },
        locationerror: () => {
            setIsLocationAllowed(false)
        },
    })

    return (
        <>
            <PlacesMarkers />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ScaleControl
                position="bottomright"
                metric={true}
                imperial={false}
            />
            <ZoomControl position="bottomright" />
            <RecenterMapButton
                map={map}
                position="bottomright"
                isEnabled={isLocationAllowed !== false}
            />
        </>
    )
}

interface NewPlaceMarkerProps {
    markerPlace: Place | null
    isShowNewPlaceMarker: boolean
}

function NewPlaceMarker({
    markerPlace,
    isShowNewPlaceMarker,
}: NewPlaceMarkerProps) {
    return (
        markerPlace &&
        isShowNewPlaceMarker && (
            <PlaceMarker place={markerPlace} hasClickAction={false} />
        )
    )
}
