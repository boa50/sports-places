import { getApiUrl } from './utils'
import type { Place } from '@/types'

export type PlaceApi = {
    place_id: number
    lat: number
    lng: number
}

export const fetchPlaces = async (): Promise<Place[]> => {
    const response = await fetch(`${getApiUrl()}/places`)

    let places = await response.json()

    places = places.map((place: PlaceApi) => {
        return {
            placeId: place.place_id,
            lat: place.lat,
            lng: place.lng,
        }
    })

    return places
}
