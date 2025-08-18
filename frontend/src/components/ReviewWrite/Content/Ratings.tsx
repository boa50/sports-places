import { RatingStarsInteractive } from '@/components/ui'

interface Props {
    rating: number
    handleRatingChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Ratings({ rating, handleRatingChange }: Props) {
    return (
        <div className="flex flex-col items-center justify-center mb-2">
            <RatingStarsInteractive
                rating={rating}
                size="size-10"
                handleChange={handleRatingChange}
            />
        </div>
    )
}
