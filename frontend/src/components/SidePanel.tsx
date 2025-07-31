import { useState, useEffect } from 'react'
import { useAppContext } from '../contexts/AppContext'
import ReviewsList from './ReviewsList'
import { Icon } from './ui/Icon'

export default function SidePanel() {
    const { state, dispatch } = useAppContext()
    const [isMobile, setIsMobile] = useState(false)

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches)
        }

        checkIfMobile()
        window.addEventListener('resize', checkIfMobile)

        return () => window.removeEventListener('resize', checkIfMobile)
    }, [])

    const getPanelClasses = () => {
        const baseClasses =
            'fixed z-1000 bg-white shadow-lg transition-all duration-300 ease-in-out'

        if (isMobile) {
            return `${baseClasses} bottom-0 left-0 right-0 h-1/2 rounded-t-lg ${
                state.isOpenPanel ? 'translate-y-0' : 'translate-y-full'
            }`
        } else {
            return `${baseClasses} left-0 top-0 bottom-0 w-sm ${
                state.isOpenPanel ? 'translate-x-0' : '-translate-x-full'
            }`
        }
    }

    const closeButtonHandleClick = () => {
        dispatch({ type: 'CLOSE_PANEL' })
        dispatch({ type: 'HIDE_NEW_PLACE_MARKER' })
    }

    return (
        <div className={getPanelClasses()}>
            <div className="flex flex-col h-screen">
                <div className="flex justify-between p-4">
                    <h2 className="text-xl font-bold">Reviews</h2>
                    <button
                        type="button"
                        aria-label="Close"
                        title="Close"
                        className="self-center cursor-pointer text-stone-900 hover:text-sky-800"
                        onClick={closeButtonHandleClick}
                    >
                        <Icon type="x" size={6} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="mt-2">
                        {state.selectedPlace === undefined ? (
                            <p className="pl-4">
                                There are no reviews for this place, write the
                                first one :)
                            </p>
                        ) : (
                            <>
                                <p className="pl-4">{state.selectedPlace}</p>
                                <ReviewsList />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
