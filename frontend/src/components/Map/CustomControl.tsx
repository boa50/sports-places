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
    customMargins?: {
        top?: string
        right?: string
        bottom?: string
        left?: string
    }
}

export default function CustomControl({
    position = 'topright',
    children,
    childrenState = undefined,
    clearDefaultClass = true,
    customMargins = {},
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

        // Setting custom margins
        if (customMargins.top !== undefined)
            container.style.marginTop = customMargins.top
        if (customMargins.right !== undefined)
            container.style.marginRight = customMargins.right
        if (customMargins.bottom !== undefined)
            container.style.marginBottom = customMargins.bottom
        if (customMargins.left !== undefined)
            container.style.marginLeft = customMargins.left

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
