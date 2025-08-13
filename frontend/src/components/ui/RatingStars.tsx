import { Icon } from './Icon'

interface Props {
    rating: number
    size?: string
}

export function RatingStars({ rating, size = 'size-6' }: Props) {
    const totalStars = 5

    const ratingRounded = Math.round(rating * 2) / 2
    const hasHalf = ratingRounded % 1 != 0
    const ratingFull = Math.floor(ratingRounded)

    return (
        <div className="flex">
            {[...Array(totalStars).keys()].map((d, i) =>
                d < ratingFull ? (
                    <Star key={i} size={size} filled="full" />
                ) : d === ratingFull && hasHalf ? (
                    <Star key={i} size={size} filled="half" />
                ) : (
                    <Star key={i} size={size} filled="none" />
                )
            )}
        </div>
    )
}

interface InteractiveProps {
    rating: number
    size?: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function RatingStarsInteractive({
    rating,
    size = 'size-6',
    handleChange,
}: InteractiveProps) {
    const totalStars = 5

    return (
        <div className="flex">
            {[...Array(totalStars).keys()].map((d, i) => (
                <div key={i}>
                    <input
                        type="radio"
                        id={`value${i + 1}`}
                        name="ratingStarsRadio"
                        value={i + 1}
                        checked={rating === i + 1}
                        onChange={handleChange}
                        className="hidden peer"
                    />
                    <label htmlFor={`value${i + 1}`} className="cursor-pointer">
                        {d < rating ? (
                            <Star size={size} filled="full" />
                        ) : (
                            <Star size={size} filled="none" />
                        )}
                    </label>
                </div>
            ))}
        </div>
    )
}

interface StarProps {
    size: string
    filled: 'full' | 'half' | 'none'
}

function Star({ size, filled }: StarProps) {
    return (
        <Icon
            type="star"
            size={size}
            filled={filled}
            colour="text-yellow-500"
        />
    )
}
