import {
    MapContainer,
    TileLayer,
    ZoomControl,
    ScaleControl,
} from 'react-leaflet'
import { latLngBounds, latLng } from 'leaflet'
import { defaults } from './defaults'

import { useSuspenseQuery } from '@tanstack/react-query'
import { reviewsQueryOptions } from '../queryOptions/reviews'

import Review from '../components/Review'
import RecenterMapButton from '../components/RecenterMapButton'

interface Props {
    id: string
    userLocation?: { latitude: number; longitude: number }
}

export default function Map({ id, userLocation }: Props) {
    const maxBounds = latLngBounds(latLng(-90, -Infinity), latLng(90, Infinity))

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
            {getComponents()}
        </MapContainer>
    )
}

function getComponents() {
    return (
        <>
            {getReviews()}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ScaleControl position="bottomleft" />
            <RecenterMapButton />
            <ZoomControl position="bottomright" />
        </>
    )
}

function getReviews() {
    const reviewsQuery = useSuspenseQuery(reviewsQueryOptions)
    const reviews = reviewsQuery.data

    return (
        <>
            {reviews.map((review, i) => (
                <Review key={i} review={review} />
            ))}
        </>
    )
}
