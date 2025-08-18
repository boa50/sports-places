interface Props {
    title: string
    width?: string
    isDisabled?: boolean
    isSubmit?: boolean
    isSecondary?: boolean
}

export function Button({
    title,
    width = 'w-fit',
    isDisabled = false,
    isSubmit = false,
    isSecondary = false,
}: Props) {
    const btnClass = `${width} cursor-pointer font-medium rounded-lg text-sm p-2.5 focus:outline-none ${
        isSecondary
            ? `text-sky-700 bg-transparent hover:bg-gray-950/5 border border-sky-700`
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
        >
            {title}
        </button>
    )
}
