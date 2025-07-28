import { useState, useEffect, type MouseEventHandler } from 'react'

interface Props {
    isOpen: boolean
    togglePanel: MouseEventHandler
}

export default function SidePanel({ isOpen, togglePanel }: Props) {
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
                    <p className="mt-2">This is your side panel content.</p>
                    <button
                        onClick={togglePanel}
                        className="mt-4 bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    )
}
