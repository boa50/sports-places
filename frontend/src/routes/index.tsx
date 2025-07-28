import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import Map from '../components/Map'
import SidePanel from '../components/SidePanel'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const [isLoading, setIsLoading] = useState(true)
    const [isOpenPanel, setIsOpenPanel] = useState(false)
    const togglePanel = () => {
        console.log(isOpenPanel)

        setIsOpenPanel(!isOpenPanel)
    }
    const [RenderedMap, setRenderedMap] = useState(
        <Map id="root" togglePanel={togglePanel} />
    )

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
                            togglePanel={togglePanel}
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
            <SidePanel isOpen={isOpenPanel} togglePanel={togglePanel} />
            {RenderedMap}
        </>
    )
}
