import type { Review } from '../types'

export async function checkLocationPermission(): Promise<PermissionState> {
    // Check if geolocation is supported at all
    if (!navigator.geolocation) {
        return 'prompt'
    }

    // Try modern Permissions API first
    if (navigator.permissions?.query) {
        try {
            const permissionStatus = await navigator.permissions.query({
                name: 'geolocation' as any, // TypeScript workaround
            })
            return permissionStatus.state as PermissionState
        } catch (error) {
            console.warn('Permissions API query failed, falling back', error)
        }
    }

    // Fallback for older browsers
    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            () => resolve('granted'),
            (error) => {
                resolve(
                    error.code === error.PERMISSION_DENIED ? 'denied' : 'prompt'
                )
            },
            { maximumAge: Infinity, timeout: 0 }
        )
    })
}

export function getRelativeTime(date: Date) {
    const formatText = (interval: number, timeText: string) => {
        const nIntervals = Math.floor(interval)
        const isSingular = nIntervals === 1

        return (
            (isSingular ? 'a' : nIntervals) +
            ` ${timeText}` +
            (isSingular ? '' : 's') +
            ' ago'
        )
    }

    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    const splits = [
        {
            divisor: 31536000,
            period: 'year',
        },
        {
            divisor: 2592000,
            period: 'month',
        },
        {
            divisor: 604800,
            period: 'week',
        },
        {
            divisor: 86400,
            period: 'day',
        },
    ]

    for (const split of splits) {
        const interval = seconds / split.divisor
        if (interval > 1) return formatText(interval, split.period)
    }

    return 'a moment ago'
}

export function averageReviews(reviews: Review[]) {
    const nReviews = reviews.length

    if (nReviews === 0) return 0

    return (
        reviews.reduce(
            (accumulator, currentValue) => accumulator + currentValue.rating,
            0
        ) / nReviews
    )
}
