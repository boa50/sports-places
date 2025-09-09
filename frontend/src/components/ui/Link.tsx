interface Props {
    title: string
    url?: string
    isOpenNewTab?: boolean
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    fontSize?: 'normal' | 'small'
}

export function Link({
    title,
    url,
    isOpenNewTab = false,
    onClick,
    fontSize = 'normal',
}: Props) {
    const defaultClass = `font-medium text-sky-700 hover:underline ${fontSize === 'normal' ? 'text-sm' : 'text-xs'}`

    return url !== undefined ? (
        <a
            href={url}
            target={isOpenNewTab ? '_blank' : '_top'}
            className={defaultClass}
            title={url}
        >
            {title}
        </a>
    ) : (
        <button
            className={`${defaultClass} cursor-pointer`}
            title={title}
            onClick={onClick}
        >
            {title}
        </button>
    )
}
