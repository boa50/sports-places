interface Props {
    type:
        | 'location'
        | 'x'
        | 'star'
        | 'review'
        | 'alert'
        | 'success'
        | 'eyeOpened'
        | 'eyeClosed'
    size?: string
    filled?: 'full' | 'half' | 'none'
    colour?: string
}

const iconsData = {
    // https://www.svgrepo.com/svg/513450/location-pin
    location: {
        viewBox: '0 0 64 64',
        path: [
            'M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24 C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24 C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z',
        ],
        strokeWidth: '1',
    },
    // https://www.svgrepo.com/svg/500510/close
    x: {
        viewBox: '0 0 1024 1024',
        path: [
            'M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z',
        ],
        strokeWidth: '25',
    },
    // https://www.svgrepo.com/svg/532718/star-sharp
    star: {
        viewBox: '0 0 24 24',
        path: [
            'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
        ],
        strokeWidth: '1',
    },
    // https://www.svgrepo.com/svg/447854/write
    review: {
        viewBox: '0 0 64 64',
        path: [
            'M55.5,23.9V53.5a2,2,0,0,1-2,2h-43a2,2,0,0,1-2-2v-43a2,2,0,0,1,2-2H41.64',
            'M19.48,38.77l-.64,5.59a.84.84,0,0,0,.92.93l5.56-.64a.87.87,0,0,0,.5-.24L54.9,15.22a1.66,1.66,0,0,0,0-2.35L51.15,9.1a1.67,1.67,0,0,0-2.36,0L19.71,38.28A.83.83,0,0,0,19.48,38.77Z',
        ],
        strokeWidth: '4',
    },
    // https://www.svgrepo.com/svg/507146/alert-triangle
    alert: {
        viewBox: '0 0 24 24',
        path: [
            'M 9.581643,15.590503 C 9.5760558,16.142775 11.4477,16.454848 12,16.454848 c 0.5523,0 2.556141,-0.294838 2.55224,-0.847124 L 14.49044,6.8578076 C 14.486538,6.3055414 12.5523,5.9409349 12,5.9409349 c -0.5523,0 -2.3249232,0.4139894 -2.3305102,0.9662411 z m 5.024061,2.421872 C 14.594462,17.46019 12.5523,17.109354 12,17.109354 c -0.5523,0 -2.3841905,0.330414 -2.3854089,0.882714 l -0.00242,1.094848 C 9.6109574,19.639215 11.4477,20.189075 12,20.189075 c 0.5523,0 2.639532,-0.515096 2.62829,-1.067283 z M 9.37735,4.66136 c 1.14305,-2.05743 4.10195,-2.05743 5.24495,0 l 6.601,11.88174 C 22.3341,18.5427 20.8882,21 18.6008,21 H 5.39885 C 3.11139,21 1.66549,18.5427 2.77637,16.5431 Z',
        ],
        strokeWidth: '1',
    },
    // https://www.svgrepo.com/svg/372095/success-standard
    success: {
        viewBox: '0 0 36 36',
        path: [
            'M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2ZM28.45,12.63,15.31,25.76,7.55,18a1.4,1.4,0,0,1,2-2l5.78,5.78L26.47,10.65a1.4,1.4,0,1,1,2,2Z',
        ],
        strokeWidth: '1',
    },
    // https://www.svgrepo.com/svg/505373/eye-open
    eyeOpened: {
        viewBox: '0 0 24 24',
        path: [
            'M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z',
            'M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z',
        ],
        strokeWidth: '1',
    },
    // https://www.svgrepo.com/svg/505372/eye-closed
    eyeClosed: {
        viewBox: '0 0 24 24',
        path: [
            'M20 14.8335C21.3082 13.3317 22 12 22 12C22 12 18.3636 5 12 5C11.6588 5 11.3254 5.02013 11 5.05822C10.6578 5.09828 10.3244 5.15822 10 5.23552M12 9C12.3506 9 12.6872 9.06015 13 9.17071C13.8524 9.47199 14.528 10.1476 14.8293 11C14.9398 11.3128 15 11.6494 15 12M3 3L21 21M12 15C11.6494 15 11.3128 14.9398 11 14.8293C10.1476 14.528 9.47198 13.8524 9.1707 13C9.11386 12.8392 9.07034 12.6721 9.04147 12.5M4.14701 9C3.83877 9.34451 3.56234 9.68241 3.31864 10C2.45286 11.1282 2 12 2 12C2 12 5.63636 19 12 19C12.3412 19 12.6746 18.9799 13 18.9418',
        ],
        strokeWidth: '1',
    },
}

export function Icon({
    type,
    size = 'size-4',
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

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={iconsData[type].viewBox}
            stroke="currentColor"
            className={`${size} ${colour}`}
        >
            {filled === 'half' ? <GradientFilling /> : null}
            {iconsData[type].path.map((d, i) => (
                <path
                    key={i}
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
                    d={d}
                />
            ))}
        </svg>
    )
}
