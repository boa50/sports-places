interface Props {
    type: 'location' | 'x'
    size?: 3 | 4 | 5 | 6
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
}

export function Icon({ type, size = 4 }: Props) {
    const { width, height } = getDimensions(size)

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={iconsData[type].viewBox}
            stroke="currentColor"
            className={`${width} ${height}`}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={iconsData[type].strokeWidth}
                fill="currentColor"
                d={iconsData[type].path}
            ></path>
        </svg>
    )
}

function getDimensions(size: number) {
    let width, height

    switch (size) {
        case 3:
            width = 'w-3'
            height = 'h-3'
            break
        case 4:
            width = 'w-4'
            height = 'h-4'
            break
        case 5:
            width = 'w-5'
            height = 'h-5'
            break
        case 6:
            width = 'w-6'
            height = 'h-6'
            break

        default:
            width = 'w-4'
            height = 'h-4'
            break
    }

    return { width, height }
}
