import { useMapEvents } from 'react-leaflet'
import { Icon } from './ui/Icon'

export default function RecenterMapButton() {
    const map = useMapEvents({
        click: () => {
            map.locate()
        },
        locationfound: (location) => {
            console.log('location found:', location)
            map.flyTo([location.latlng.lat, location.latlng.lng], 14)
        },
    })
    return (
        <button
            type="button"
            className="absolute z-400 p-1.75 text-sm font-medium text-center bottom-24 right-3
            text-stone-900 bg-white rounded-sm hover:bg-gray-100 ring-2 ring-black/20"
        >
            <Icon type="location" />
        </button>
    )
}
