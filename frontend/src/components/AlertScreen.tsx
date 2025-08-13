import { useEffect } from 'react'
import { useAppContext } from '@/contexts/AppContext'
import { Alert } from './ui'
import type { AlertScreen as AlertScreenType } from '@/types'

export default function AlertScreen({
    message,
    type,
    timeToHide,
}: AlertScreenType) {
    const { dispatch } = useAppContext()

    useEffect(() => {
        if (timeToHide !== undefined) {
            setTimeout(() => {
                dispatch({ type: 'HIDE_ALERT_SCREEN' })
            }, timeToHide)
        }
    }, [timeToHide])

    return (
        <div className="fixed z-1500 bottom-2 left-1/2">
            <Alert message={message} type={type} />
        </div>
    )
}
