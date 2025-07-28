import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import Map from '../components/Map'
import SidePanel from '../components/SidePanel'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const [isLoading, setIsLoading] = useState(true)
    // const [isOpenPanel, setIsOpenPanel] = useState(false)
    // const [selectedPlace, setSelectedPlace] = useState<string | undefined>(
    //     undefined
    // )
    // const openPanel = () => {
    //     setIsOpenPanel(true)
    // }
    // const closePanel = () => {
    //     setIsOpenPanel(false)
    // }
    const [RenderedMap, setRenderedMap] = useState(
        <Map
            id="root"
            // openPanel={openPanel}
            // setSelectedPlace={setSelectedPlace}
        />
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
                            // openPanel={openPanel}
                            // setSelectedPlace={setSelectedPlace}
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
