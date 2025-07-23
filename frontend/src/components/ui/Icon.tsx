interface Props {
    type: 'location'
}

const iconsData = {
    // https://www.svgrepo.com/svg/513450/location-pin
    location: {
        viewBox: '0 0 64 64',
        path: 'M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24 C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24 C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z',
        strokeWidth: '1',
    },
}

export function Icon({ type }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={iconsData[type].viewBox}
            stroke="currentColor"
            className={`w-4 h-4 text-black`}
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
