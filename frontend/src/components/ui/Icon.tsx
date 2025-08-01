interface Props {
    type: 'location' | 'x' | 'star'
    size?: 3 | 3.5 | 4 | 5 | 6
    filled?: 'full' | 'half' | 'none'
    colour?: string
}

const iconsData = {
    // https://www.svgrepo.com/svg/513450/location-pin
    location: {
        viewBox: '0 0 64 64',
        path: 'M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24 C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24 C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z',
        strokeWidth: '1',
    },
    // https://www.svgrepo.com/svg/500510/close
    x: {
        viewBox: '0 0 1024 1024',
        path: 'M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z',
        strokeWidth: '25',
    },
    // https://www.svgrepo.com/svg/532718/star-sharp
    star: {
        viewBox: '0 0 24 24',
        path: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
        strokeWidth: '1',
    },
}

export function Icon({
    type,
    size = 4,
    filled = 'full',
    colour = 'fill-current',
}: Props) {
    const gradientId = 'iconGradFill' + Math.random()

    const GradientFilling = () => (
        <defs>
            <linearGradient id={gradientId}>
                <stop offset="0%" stopColor="currentColor" />
                <stop offset="49%" stopColor="currentColor" />
                <stop offset="51%" stopColor="transparent" />
                <stop offset="100%" stopColor="transparent" />
            </linearGradient>
        </defs>
    )

    const dimensions = getDimensions(size)

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={iconsData[type].viewBox}
            stroke="currentColor"
            className={`${dimensions} ${colour}`}
        >
            {filled === 'half' ? <GradientFilling /> : null}
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={iconsData[type].strokeWidth}
                fill={
                    filled === 'full'
                        ? 'currentColor'
                        : filled === 'half'
                          ? `url(#${gradientId})`
                          : 'none'
                }
                d={iconsData[type].path}
            ></path>
        </svg>
    )
}

function getDimensions(size: number) {
    switch (size) {
        case 3:
            return 'size-3'
        case 3.5:
            return 'size-3.5'
        case 4:
            return 'size-4'
        case 5:
            return 'size-5'
        case 6:
            return 'size-6'

        default:
            return 'size-4'
    }
}
