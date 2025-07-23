import { createFileRoute } from '@tanstack/react-router'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    ZoomControl,
} from 'react-leaflet'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <MapContainer
            id="root"
            className="h-dvh"
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={true}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <ZoomControl position="bottomright" />
        </MapContainer>
    )
}
