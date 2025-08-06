import { useState, useEffect } from 'react'
import { useAppContext } from '../contexts/AppContext'
import ReviewsList from './ReviewsList'
import { Icon } from './ui/Icon'
import type { AppAction, AppState } from '../types'

interface Props {
    showWriteReview: () => void
}

export default function SidePanel({ showWriteReview }: Props) {
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

    return (
        <div className={getPanelClasses()}>
            <div className="flex flex-col h-screen">
                <Header dispatch={dispatch} />
                <Content state={state} showWriteReview={showWriteReview} />
            </div>
        </div>
    )
}

interface HeaderProps {
    dispatch: React.Dispatch<AppAction>
}

function Header({ dispatch }: HeaderProps) {
    const closeButtonHandleClick = () => {
        dispatch({ type: 'CLOSE_PANEL' })
        dispatch({ type: 'HIDE_NEW_PLACE_MARKER' })
        dispatch({ type: 'CLEAR_SELECTED_PLACE' })
    }

    return (
        <div className="flex justify-between p-4 border-b border-b-gray-200">
            <h2 className="text-xl font-bold">Reviews</h2>
            <button
                type="button"
                aria-label="Close"
                title="Close"
                className="self-center cursor-pointer text-gray-900 hover:text-sky-800"
                onClick={closeButtonHandleClick}
            >
                <Icon type="x" size={6} />
            </button>
        </div>
    )
}

interface ContentProps {
    state: AppState
    showWriteReview: () => void
}

function Content({ state, showWriteReview }: ContentProps) {
    return (
        <div className="flex-1 overflow-y-auto">
            <div className="py-4 flex flex-col border-b border-b-gray-200 items-center">
                <button
                    type="button"
                    aria-label="Write a review"
                    title="Write a review"
                    className="cursor-pointer font-medium rounded-lg text-sm p-2.5 focus:outline-none
                    text-sky-800 bg-sky-400/20 hover:bg-sky-400/50"
                    onClick={showWriteReview}
                >
                    <div className="flex items-center gap-1">
                        <Icon type="review" size={4} filled="none" />
                        Write a review
                    </div>
                </button>
            </div>
            <div className="mt-2">
                {state.selectedPlace?.place_id === -1 ? (
                    <p className="pl-4">
                        There are no reviews for this place, write the first one
                        :)
                    </p>
                ) : (
                    <ReviewsList />
                )}
            </div>
        </div>
    )
}
