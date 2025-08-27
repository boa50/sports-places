import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useAppContext } from '@/contexts/AppContext'
import { checkLocationPermission } from '@/utils'
import Map from '@/components/Map'
import SidePanel from '@/components/SidePanel'
import ReviewWrite from '@/components/ReviewWrite'
import AlertScreen from '@/components/AlertScreen'
import LoginForm from '@/components/LoginForm'
import UserCustomisationForm from '@/components/UserCustomisationForm'
import UserPanel from '@/components/UserPanel'
import { onUserStateChanged } from '@/auth'
import { useQuery } from '@tanstack/react-query'
import { userQueryOptions } from '@/queryOptions'
import { getCurrentUser } from '@/auth'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const { state, dispatch } = useAppContext()
    const [isLoading, setIsLoading] = useState(true)
    const [RenderedMap, setRenderedMap] = useState(<Map />)
    const [isShowWriteReview, setIsShowWriteReview] = useState(false)

    useEffect(() => {
        const userObserver = onUserStateChanged(dispatch)
        return () => userObserver()
    }, [])

    const { data: userData, isPending: isPendingUserData } = useQuery(
        userQueryOptions(getCurrentUser()?.uid)
    )

    useEffect(() => {
        if (
            state.isUserSignedIn &&
            !isPendingUserData &&
            userData?.userId === -1
        )
            dispatch({ type: 'SHOW_USER_CUSTOMISATION_FORM' })
    }, [state.isUserSignedIn, isPendingUserData, userData])

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkIfMobile = () => {
            const isMobile = window.matchMedia('(max-width: 768px)').matches
            dispatch({ type: 'SET_IS_MOBILE', payload: isMobile })
        }

        checkIfMobile()
        window.addEventListener('resize', checkIfMobile)

        return () => window.removeEventListener('resize', checkIfMobile)
    }, [])

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
            <LoginForm />
            <UserCustomisationForm />
            <UserPanel />
            {RenderedMap}
            {state.isAlertScreenVisible && (
                <AlertScreen
                    message={state.alertScreen.message}
                    type={state.alertScreen.type}
                    timeToHide={state.alertScreen.timeToHide}
                />
            )}
        </div>
    )
}
