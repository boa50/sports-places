interface Props {
    title: string
    url: string
    isOpenNewTab?: boolean
}

export function Link({ title, url, isOpenNewTab = false }: Props) {
    return (
        <a
            href={url}
            target={isOpenNewTab ? '_blank' : '_top'}
            className="text-sm font-medium text-sky-700 hover:underline"
            title={url}
        >
            {title}
        </a>
    )
}
