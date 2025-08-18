import { useMap } from 'react-leaflet'
import { useEffect } from 'react'
import L from 'leaflet'
import { createRoot } from 'react-dom/client'
import type { ControlPosition } from 'leaflet'
import type { ReactElement } from 'react'

interface Props {
    position: ControlPosition
    children?: ReactElement
    childrenState?: any
    clearDefaultClass?: boolean
}

export default function CustomControl({
    position = 'topright',
    children,
    childrenState = undefined,
    clearDefaultClass = true,
}: Props) {
    const map = useMap()

    useEffect(() => {
        // 1. Prepare an empty container <div> for React to render into
        const container = L.DomUtil.create(
            'div',
            clearDefaultClass ? 'leaflet-bar leaflet-control' : ''
        )
        // Prevent map clicks when interacting with the control
        L.DomEvent.disableClickPropagation(container)

        // 2. Tell React to render the children component inside that container
        const root = createRoot(container)
        root.render(children)

        // 3. Wrap the container in a real Leaflet control
        const Control = L.Control.extend({
            onAdd: () => container,
            onRemove: () => setTimeout(() => root.unmount(), 0), // clean up React tree
        })

        const control = new Control({ position })
        map.addControl(control)

        // 4. Remove on unmount
        return () => {
            map.removeControl(control)
        }
    }, [map, position, childrenState])

    return null // nothing visible in React’s own tree
}
