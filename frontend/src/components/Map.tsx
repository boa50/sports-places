import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    ZoomControl,
    ScaleControl,
} from 'react-leaflet'
import { latLngBounds, latLng } from 'leaflet'
import RecenterMapButton from '../components/RecenterMapButton'
import { defaults } from './defaults'

import { useSuspenseQuery } from '@tanstack/react-query'
import { reviewsQueryOptions } from '../queryOptions/reviews'

interface Props {
    id: string
    userLocation?: { latitude: number; longitude: number }
}

export default function Map({ id, userLocation }: Props) {
    const maxBounds = latLngBounds(latLng(-90, -Infinity), latLng(90, Infinity))

    const reviewsQuery = useSuspenseQuery(reviewsQueryOptions)
    const reviews = reviewsQuery.data

    console.log(reviews)

    return (
        <MapContainer
            id={id}
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
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <ScaleControl position="bottomleft" />
            <RecenterMapButton />
            <ZoomControl position="bottomright" />
        </MapContainer>
    )
}
