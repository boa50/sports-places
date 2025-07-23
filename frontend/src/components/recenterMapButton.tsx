import { useMapEvents } from 'react-leaflet'

function RecenterMapButton() {
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
            className="absolute z-400 px-3 py-2 text-sm font-medium text-center bottom-24 right-3
            text-stone-900 bg-white rounded-lg hover:bg-gray-100 ring-2 ring-black/20"
        >
            Locate
        </button>
    )
}

export default RecenterMapButton
