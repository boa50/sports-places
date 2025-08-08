interface Props {
    message: string
    type: 'success' | 'error' | 'info'
}

export function Alert({ message, type }: Props) {
    let typeClassNames = 'text-gray-700 bg-gray-50/90'

    switch (type) {
        case 'success':
            typeClassNames = 'text-sky-700 bg-sky-50/90'
            break
        case 'error':
            typeClassNames = 'text-red-700 bg-red-50/90'
            break
        case 'info':
            break

        default:
            break
    }

    return (
        <div
            className={`flex items-center px-4 py-2 rounded-lg shadow-sm ${typeClassNames}`}
            role="alert"
        >
            <div className="text-sm font-normal">{message}</div>
        </div>
    )
}
