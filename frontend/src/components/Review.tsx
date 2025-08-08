import { RatingStars } from './ui/RatingStars'
import { getRelativeTime } from '../utils'
import type { Review } from '../types'

interface Props {
    review: Review
}

export default function Review({ review }: Props) {
    return (
        <div className="flex flex-col text-sm font-sans font-normal">
            <div className="flex flex-col leading-3">
                <div className="text-base">{review.user_id}</div>
                {/* <div className="text-gray-500">
                    User Title - User reviews punctuation
                </div> */}
            </div>
            <div className="flex gap-x-2 pt-2 items-center">
                <div>
                    <RatingStars rating={review.rating} size="small" />
                </div>
                <div className="text-gray-500">
                    {getRelativeTime(review.experience_date)}
                </div>
            </div>
        </div>
    )
}
