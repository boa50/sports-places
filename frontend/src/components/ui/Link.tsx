interface Props {
    title: string
    url: string
}

export function Link({ title, url }: Props) {
    return (
        <a
            href={url}
            target="_blank"
            className="text-sm font-medium text-sky-700 hover:underline"
            title={title}
        >
            {title}
        </a>
    )
}
