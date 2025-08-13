import { Icon } from '@/components/ui'
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
        <div className="flex flex-col gap-2 text-sm text-gray-500">
            <Ratings rating={rating} handleRatingChange={handleRatingChange} />
            <div className="flex gap-2 justify-start pt-2">
                <label htmlFor="experience-date" className="self-center">
                    Experience date:
                </label>
                <input
                    type="date"
                    id="experience-date"
                    name="experience-date"
                    className="border rounded-lg p-1 
                        focus:outline focus:outline-sky-600 focus:border-sky-600"
                    max={new Date().toISOString().slice(0, 10)}
                    value={experienceDate}
                    onChange={handleExperienceDateChange}
                />
            </div>
            <div className="flex gap-2 justify-start">
                <label htmlFor="route-link" className="self-center">
                    Route link:
                </label>
                <input
                    type="url"
                    id="route-link"
                    name="route-link"
                    className="border rounded-lg p-1 
                        focus:outline focus:outline-sky-600 focus:border-sky-600 
                        invalid:border-red-700 focus:invalid:outline-red-700 focus:invalid:border-red-700"
                    placeholder="Put your route url here"
                    value={routeLink}
                    onChange={handleRouteLinkChange}
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
