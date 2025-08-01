import { RatingStars } from './ui/RatingStars'

interface Props {
    username: string
    rating: number
}

export default function Review({ username, rating }: Props) {
    return (
        <div className="flex flex-col text-sm font-sans font-normal">
            <div className="flex flex-col leading-3">
                <div className="text-base">{username}</div>
                {/* <div className="text-gray-500">
                    User Title - User reviews punctuation
                </div> */}
            </div>
            <div className="flex gap-x-2 pt-2 items-center">
                <div>
                    <RatingStars rating={rating} size="small" />
                </div>
                {/* <div className="text-gray-500">Time from now</div> */}
            </div>
        </div>
    )
}
