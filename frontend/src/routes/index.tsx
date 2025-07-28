import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import Map from '../components/Map'
import SidePanel from '../components/SidePanel'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const [isLoading, setIsLoading] = useState(true)
    const [RenderedMap, setRenderedMap] = useState(<Map id="root" />)

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setRenderedMap(
                        <Map
                            id="root"
                            userLocation={{
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            }}
                        />
                    )
                    setIsLoading(false)
                },
                () => {
                    setIsLoading(false)
                },
                { timeout: 10000, maximumAge: Infinity }
            )
        } else {
            setIsLoading(false)
        }
    }, [])

    if (isLoading) {
        return <></>
    }

    return (
        <>
            <SidePanel />
            {RenderedMap}
        </>
    )
}
