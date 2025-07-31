import { Icon } from './ui/Icon'
import CustomControl from './CustomControl'
import type { Map, ControlPosition } from 'leaflet'

interface Props {
    map: Map
    position?: ControlPosition
    isEnabled?: boolean
}

export default function RecenterMapButton({
    map,
    position = 'topleft',
    isEnabled = true,
}: Props) {
    return (
        <CustomControl position={position} childrenState={isEnabled}>
            <button
                type="button"
                onClick={() => {
                    map.locate({
                        timeout: 10000,
                        maximumAge: Infinity,
                        enableHighAccuracy: true,
                    })
                }}
                disabled={!isEnabled}
                aria-label="Find location"
                title="Find location"
                className="p-1.75 cursor-pointer 
                text-stone-900 bg-white rounded-xs hover:bg-gray-100
                disabled:text-stone-300 disabled:bg-neutral-100 disabled:cursor-default"
            >
                <Icon type="location" size={4} />
            </button>
        </CustomControl>
    )
}
