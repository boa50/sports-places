import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    ZoomControl,
    ScaleControl,
} from 'react-leaflet'
import RecenterMapButton from '../components/RecenterMapButton'
import { defaults } from './defaults'

interface Props {
    id: string
    userLocation?: { latitude: number; longitude: number }
}

export default function Map({ id, userLocation }: Props) {
    return (
        <MapContainer
            id={id}
            className="h-dvh"
            center={[
                userLocation ? userLocation.latitude : defaults.latitude,
                userLocation ? userLocation.longitude : defaults.longitude,
            ]}
            zoom={userLocation ? defaults.usersZoom : defaults.zoom}
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
            <ScaleControl position="bottomleft" />
            <RecenterMapButton />
            <ZoomControl position="bottomright" />
        </MapContainer>
    )
}
