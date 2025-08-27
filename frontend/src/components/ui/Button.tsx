import { Icon } from './Icon'
import type { Icons } from './Icon'

interface Props {
    title: string
    width?: string
    isDisabled?: boolean
    isSubmit?: boolean
    isSecondary?: boolean
    onClick?: () => void
    icon?: Icons
}

export function Button({
    title,
    width = 'w-fit',
    isDisabled = false,
    isSubmit = false,
    isSecondary = false,
    onClick,
    icon,
}: Props) {
    const btnClass = `${width} cursor-pointer font-medium rounded-lg text-sm p-2.5 focus:outline-none ${
        isSecondary
            ? `text-sky-700 bg-transparent hover:bg-gray-950/5 border border-sky-700
            disabled:text-gray-400 disabled:bg-gray-200 disabled:border-gray-300 disabled:cursor-default`
            : `text-white bg-sky-600 hover:bg-sky-600/90
            disabled:text-gray-100 disabled:bg-gray-400 disabled:cursor-default`
    }`

    return (
        <button
            type={isSubmit ? 'submit' : 'button'}
            aria-label={title}
            title={title}
            className={btnClass}
            disabled={isDisabled}
            onClick={onClick}
        >
            {icon !== undefined ? (
                <div className="flex w-full justify-center items-center gap-1">
                    <Icon type={icon} size="size-4" filled="none" />
                    {title}
                </div>
            ) : (
                title
            )}
        </button>
    )
}
