import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import Map from '../components/Map'
import SidePanel from '../components/SidePanel'
import ReviewWrite from '../components/ReviewWrite'
import { checkLocationPermission } from '../utils'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const [isLoading, setIsLoading] = useState(true)
    const [RenderedMap, setRenderedMap] = useState(<Map />)
    const [isShowWriteReview, setIsShowWriteReview] = useState(false)

    useEffect(() => {
        checkLocationPermission().then((status) => {
            if (status === 'granted') {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setRenderedMap(
                            <Map
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
                    {
                        timeout: 10000,
                        maximumAge: Infinity,
                        enableHighAccuracy: false,
                    }
                )
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    if (isLoading) {
        return <></>
    }

    return (
        <div id="root">
            <ReviewWrite
                isShow={isShowWriteReview}
                hideWriteReview={() => setIsShowWriteReview(false)}
            />
            <SidePanel
                showWriteReview={() => {
                    setIsShowWriteReview(true)
                }}
            />
            {RenderedMap}
        </div>
    )
}
