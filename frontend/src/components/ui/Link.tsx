interface Props {
    title: string
    url?: string
    isOpenNewTab?: boolean
    onClick?: () => void
}

export function Link({ title, url, isOpenNewTab = false, onClick }: Props) {
    const defaultClass = 'text-sm font-medium text-sky-700 hover:underline'

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
        <div
            role="button"
            className={`${defaultClass} cursor-pointer`}
            title={title}
            onClick={onClick}
        >
            {title}
        </div>
    )
}
