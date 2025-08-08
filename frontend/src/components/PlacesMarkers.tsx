import { Suspense } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { placesQueryOptions } from '../queryOptions'
import PlaceMarker from './PlaceMarker'
import AlertScreen from './AlertScreen'

export default function PlacesMarkers() {
    return (
        <Suspense
            fallback={<AlertScreen message="Loading places..." type="info" />}
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
