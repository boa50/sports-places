import { Suspense } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { placesQueryOptions } from '../queryOptions'
import PlaceMarker from './PlaceMarker'

export default function PlacesMarkers() {
    return (
        <Suspense
            fallback={
                <div className="fixed z-1500 flex items-end justify-center w-screen h-screen">
                    <div className="bg-white/70 px-2 py-0">Loading places</div>
                </div>
            }
        >
            <PlacesMarkersBuild />
        </Suspense>
    )
}

function PlacesMarkersBuild() {
    const { data: places } = useSuspenseQuery(placesQueryOptions)

    return (
        <>
            {places.map((place, i) => (
                <PlaceMarker key={i} place={place} />
            ))}
        </>
    )
}
