import { Icon, Input } from '@/components/ui'
import Ratings from './Ratings'
import IsTrustedUrl from './IsTrustedUrl'

interface Props {
    experienceDate: string
    handleExperienceDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    rating: number
    handleRatingChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    routeLink?: string
    handleRouteLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    routeLinkMaxLength: number
}

export default function ReviewContent({
    experienceDate,
    handleExperienceDateChange,
    rating,
    handleRatingChange,
    routeLink,
    handleRouteLinkChange,
    routeLinkMaxLength,
}: Props) {
    return (
        <div className="flex flex-col gap-4 text-sm text-gray-500">
            <Ratings rating={rating} handleRatingChange={handleRatingChange} />
            <Input
                id="experience-date"
                label="Experience date:"
                type="date"
                hint="Fill the date of the experience"
                value={experienceDate}
                onChange={handleExperienceDateChange}
                maxValue={new Date().toISOString().slice(0, 10)}
                isSameLine={true}
            />
            <div className="flex gap-2 justify-start">
                <Input
                    id="route-link"
                    label="Route link:"
                    type="url"
                    hint="Fill the route link url"
                    value={routeLink}
                    onChange={handleRouteLinkChange}
                    isSameLine={true}
                />
                <div className="self-center">
                    {routeLink !== undefined &&
                    routeLink.length <= routeLinkMaxLength ? (
                        <IsTrustedUrl url={routeLink} />
                    ) : (
                        <div
                            title={`This url is too big, please insert an urll smaller than ${routeLinkMaxLength} characters`}
                        >
                            <Icon type="alert" size="size-4" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
