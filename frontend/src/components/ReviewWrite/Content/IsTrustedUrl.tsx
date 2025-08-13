import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { validateRouteLinkQueryOptions } from '@/queryOptions'
import { Icon, Spinner } from '@/components/ui'

interface Props {
    url: string
}

export default function IsTrustedUrl({ url }: Props) {
    const [isUrlTrusted, setIsUrlTrusted] = useState<boolean | undefined>()
    const [queryKey, setQueryKey] = useState<string>('')

    useEffect(() => {
        setIsUrlTrusted(undefined)

        if (url !== '') {
            const validateRouteLink = setTimeout(() => {
                setQueryKey(url)
            }, 500)

            return () => clearTimeout(validateRouteLink)
        }
    }, [url])

    const query = useQuery(validateRouteLinkQueryOptions(queryKey))

    useEffect(() => {
        if (query.data !== null) setIsUrlTrusted(query.data)
    }, [query.data])

    return (
        url !== '' && (
            <>
                {isUrlTrusted === undefined && <Spinner size="size-4" />}
                {isUrlTrusted === true && (
                    <div title="This link is from a trusted source">
                        <Icon type="success" size="size-4" />
                    </div>
                )}
                {isUrlTrusted === false && (
                    <div title="This link could not be verified, make sure it is from a trusted source">
                        <Icon type="alert" size="size-4" />
                    </div>
                )}
            </>
        )
    )
}
