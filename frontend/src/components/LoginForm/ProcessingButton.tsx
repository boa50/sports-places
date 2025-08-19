import { Spinner } from '../ui'

interface Props {
    width?: string
}

export default function ProcessingButton({ width = 'w-fit' }: Props) {
    return (
        <div
            className={`${width} flex justify-center bg-sky-600/90 rounded-lg text-sm p-2.5 focus:outline-none`}
        >
            <Spinner size="size-5" />
        </div>
    )
}
