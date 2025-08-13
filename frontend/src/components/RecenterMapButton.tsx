import { useAppContext } from '@/contexts/AppContext'
import CustomControl from './CustomControl'
import { Icon } from './ui/Icon'
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
    const { dispatch } = useAppContext()

    return (
        <CustomControl position={position} childrenState={isEnabled}>
            <button
                type="button"
                onClick={() => {
                    dispatch({
                        type: 'SHOW_ALERT_SCREEN',
                        payload: {
                            message: 'Getting your location',
                            type: 'info',
                        },
                    })

                    map.locate({
                        timeout: 10000,
                        maximumAge: Infinity,
                        enableHighAccuracy: true,
                    })
                }}
                disabled={!isEnabled}
                aria-label="Show your location"
                title="Show your location"
                className="p-1.75 cursor-pointer 
                text-stone-900 bg-white rounded-xs hover:bg-gray-100
                disabled:text-stone-300 disabled:bg-neutral-100 disabled:cursor-default"
            >
                <Icon type="location" size="size-4" />
            </button>
        </CustomControl>
    )
}
