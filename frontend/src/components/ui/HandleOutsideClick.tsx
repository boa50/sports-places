import { useRef, useEffect } from 'react'

interface Props {
    action: () => void
    children: React.ReactNode
}

export function HandleOutsideClick({ action, children }: Props) {
    const ref = useRef(null)
    useOutsideAlerter(ref, action)

    return <div ref={ref}>{children}</div>
}

function useOutsideAlerter(
    ref: React.RefObject<HTMLInputElement | null>,
    action: () => void
) {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                action()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref])
}
