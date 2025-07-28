import { useState, useEffect } from 'react'

interface Props {
    isOpen: boolean
    closePanel: () => void
    seletedPlace: string | undefined
}

export default function SidePanel({ isOpen, closePanel, seletedPlace }: Props) {
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

    // Panel classes based on device and state
    const getPanelClasses = () => {
        const baseClasses =
            'fixed z-500 bg-white shadow-lg transition-all duration-300 ease-in-out'

        if (isMobile) {
            return `${baseClasses} bottom-0 left-0 right-0 h-1/2 rounded-t-lg ${
                isOpen ? 'translate-y-0' : 'translate-y-full'
            }`
        } else {
            return `${baseClasses} left-0 top-0 bottom-0 w-64 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`
        }
    }

    return (
        <>
            <div className={getPanelClasses()}>
                <div className="p-4">
                    <h2 className="text-xl font-bold">Panel Content</h2>
                    <div className="mt-2">
                        {seletedPlace === undefined ? (
                            <p>
                                There are no reviews for this place, write the
                                first one :)
                            </p>
                        ) : (
                            <p>There are pleny of reviews for here</p>
                        )}
                    </div>
                    <button
                        onClick={closePanel}
                        className="mt-4 bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    )
}
