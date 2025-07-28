import {
    MapContainer,
    TileLayer,
    ZoomControl,
    ScaleControl,
    useMapEvent,
} from 'react-leaflet'
import { latLngBounds, latLng } from 'leaflet'
import { defaults } from './defaults'

import Review from '../components/Review'
import RecenterMapButton from '../components/RecenterMapButton'
import ReviewsMarkers from './ReviewsMarkers'

// import { useMutation } from '@tanstack/react-query'
// import { createReview } from '../api/reviews'

import { Suspense, useState } from 'react'

function ClickHandler({ onMapClick, togglePanel }) {
    useMapEvent('click', (e) => {
        onMapClick(e.latlng)
        togglePanel()
    })
    return null
}

interface Props {
    id: string
    userLocation?: { latitude: number; longitude: number }
    togglePanel: Function
}

export default function Map({ id, userLocation, togglePanel }: Props) {
    const maxBounds = latLngBounds(latLng(-90, -Infinity), latLng(90, Infinity))
    const [markerPosition, setMarkerPosition] = useState(null)

    // const { mutate, isError, isSuccess, data, error } = useMutation({
    //     mutationFn: createReview,
    //     onSuccess: (data) => {
    //         // Invalidate or update relevant queries after successful mutation
    //         // queryClient.invalidateQueries({ queryKey: ['posts'] })
    //         console.log('Post created successfully:', data)
    //     },
    //     onError: (error) => {
    //         console.error('Error creating post:', error)
    //     },
    // })

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
            {/* {getComponents()} */}
            <MapComponents />

            {/* Listen for clicks */}
            <ClickHandler
                onMapClick={setMarkerPosition}
                togglePanel={togglePanel}
            />

            {/* Show marker if position is set */}
            {markerPosition && (
                <Review
                    review={{
                        lat: markerPosition.lat,
                        long: markerPosition.lng,
                        txt: 'Teste',
                    }}
                />
            )}
        </MapContainer>
    )
}

function MapComponents() {
    return (
        <>
            <Suspense>
                <ReviewsMarkers />
            </Suspense>
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
