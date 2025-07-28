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

function ClickHandler({ onMapClick }) {
    useMapEvent('click', (e) => {
        onMapClick(e.latlng)
    })
    return null
}

interface Props {
    id: string
    userLocation?: { latitude: number; longitude: number }
    openPanel: () => void
    setSelectedPlace: (place: string) => void
}

export default function Map({
    id,
    userLocation,
    openPanel,
    setSelectedPlace,
}: Props) {
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
            <MapComponents
                openPanel={openPanel}
                setSelectedPlace={setSelectedPlace}
            />

            {/* Listen for clicks */}
            <ClickHandler onMapClick={setMarkerPosition} />

            {/* Show marker if position is set */}
            {markerPosition && (
                <Review
                    review={{
                        lat: markerPosition.lat,
                        long: markerPosition.lng,
                        txt: 'Teste',
                    }}
                    openPanel={openPanel}
                    setSelectedPlace={setSelectedPlace}
                />
            )}
        </MapContainer>
    )
}

interface MapComponentsProps {
    openPanel: () => void
    setSelectedPlace: (place: string) => void
}

function MapComponents({ openPanel, setSelectedPlace }: MapComponentsProps) {
    return (
        <>
            <Suspense>
                <ReviewsMarkers
                    openPanel={openPanel}
                    setSelectedPlace={setSelectedPlace}
                />
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
