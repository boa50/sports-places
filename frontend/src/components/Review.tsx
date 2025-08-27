import { Icon, RatingStars, Link } from './ui'
import { getRelativeTime } from '@/utils'
import { useSuspenseQuery } from '@tanstack/react-query'
import { avatarUrlQueryOptions } from '@/queryOptions'
import UserAvatar from './UserAvatar'
import type { Review } from '@/types'

interface Props {
    review: Review
}

export default function Review({ review }: Props) {
    const { data: avatarUrl } = useSuspenseQuery(
        avatarUrlQueryOptions(review.userAvatarDescription)
    )

    return (
        <div className="flex text-sm font-sans font-normal gap-2">
            <div className="mt-1">
                <UserAvatar size="small" avatarUrl={avatarUrl} />
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col leading-3">
                    <div className="text-sm font-medium">
                        {review.userDisplayName}
                    </div>
                    {/* <div className="text-gray-500">User title + num of reviews</div> */}
                </div>
                <div id="review-content" className="flex flex-col gap-y-1">
                    <div className="flex gap-x-2 items-center">
                        <div>
                            <RatingStars
                                rating={review.rating}
                                size="size-3.5"
                            />
                        </div>
                        <div className="text-gray-500">
                            {getRelativeTime(review.experienceDate)}
                        </div>
                    </div>
                    {review.routeLink && (
                        <div className="flex gap-x-2 items-center">
                            <Link
                                title="Route link"
                                url={review.routeLink}
                                isOpenNewTab={true}
                                fontSize="small"
                            />
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
        </div>
    )
}
