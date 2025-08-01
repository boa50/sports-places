import { getApiUrl } from './utils'
import type { Place } from '../types'

export const fetchPlaces = async (): Promise<Place[]> => {
    const response = await fetch(`${getApiUrl()}/places`)

    return await response.json()
}
