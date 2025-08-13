import { Icon, RatingStars } from './ui'
import { getRelativeTime } from '@/utils'
import type { Review } from '@/types'

interface Props {
    review: Review
}

export default function Review({ review }: Props) {
    return (
        <div className="flex flex-col text-sm font-sans font-normal">
            <div className="flex flex-col leading-3">
                <div className="text-base">{review.userId}</div>
                {/* <div className="text-gray-500">
                    User Title - User reviews punctuation
                </div> */}
            </div>
            <div id="review-content" className="flex flex-col pt-2 gap-y-1">
                <div className="flex gap-x-2 items-center">
                    <div>
                        <RatingStars rating={review.rating} size="size-3.5" />
                    </div>
                    <div className="text-gray-500">
                        {getRelativeTime(review.experienceDate)}
                    </div>
                </div>
                {review.routeLink && (
                    <div className="flex gap-x-2 items-center">
                        <a
                            href={review.routeLink}
                            target="_blank"
                            className="font-medium text-sky-700 hover:underline"
                            title={review.routeLink}
                        >
                            Route link
                        </a>
                        {!review.routeLinkTrusted && (
                            <div
                                title="This link could not be verified, check the url before clicking on it"
                                className="self-center"
                            >
                                <Icon
                                    type="alert"
                                    colour="text-gray-500"
                                    size="size-3"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
