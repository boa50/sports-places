import { Alert } from './ui'

interface Props {
    message: string
    type: 'success' | 'error' | 'info'
}

export default function AlertScreen({ message, type }: Props) {
    return (
        <div className="fixed z-1500 bottom-2 left-1/2">
            <Alert message={message} type={type} />
        </div>
    )
}
