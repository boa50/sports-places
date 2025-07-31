import { Icon } from './ui/Icon'
import CustomControl from './CustomControl'
import type { Map, ControlPosition } from 'leaflet'

interface Props {
    map: Map
    position?: ControlPosition
}

export default function RecenterMapButton({
    map,
    position = 'topleft',
}: Props) {
    return (
        <CustomControl position={position}>
            <button
                type="button"
                onClick={() => {
                    map.locate({
                        timeout: 10000,
                        maximumAge: Infinity,
                        enableHighAccuracy: true,
                    })
                }}
                aria-label="Find location"
                title="Find location"
                className="p-1.75 cursor-pointer
            text-stone-900 bg-white rounded-sm hover:bg-gray-100"
            >
                <Icon type="location" />
            </button>
        </CustomControl>
    )
}
