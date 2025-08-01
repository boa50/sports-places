import { Icon } from './Icon'

interface Props {
    rating: number
    size?: 'normal' | 'small'
}

export function RatingStars({ rating, size = 'normal' }: Props) {
    const totalStars = 5
    const starSize = size === 'normal' ? 6 : 3.5

    const ratingRounded = Math.round(rating * 2) / 2
    const hasHalf = ratingRounded % 1 != 0
    const ratingFull = Math.floor(ratingRounded)

    return (
        <div className="flex">
            {[...Array(totalStars).keys()].map((d, i) =>
                d < ratingFull ? (
                    <Star key={i} size={starSize} filled="full" />
                ) : d === ratingFull && hasHalf ? (
                    <Star key={i} size={starSize} filled="half" />
                ) : (
                    <Star key={i} size={starSize} filled="none" />
                )
            )}
        </div>
    )
}

interface InteractiveProps {
    rating: number
    size?: 'normal' | 'small'
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function RatingStarsInteractive({
    rating,
    size = 'normal',
    handleChange,
}: InteractiveProps) {
    const totalStars = 5
    const starSize = size === 'normal' ? 6 : 3.5

    return (
        <div className="flex">
            {[...Array(totalStars).keys()].map((d, i) => (
                <>
                    <input
                        type="radio"
                        id={`value${i + 1}`}
                        key={i + 1}
                        name="ratingStarsRadio"
                        value={i + 1}
                        checked={rating === i + 1}
                        onChange={handleChange}
                        className="hidden peer"
                    />
                    <label htmlFor={`value${i + 1}`}>
                        {d < rating ? (
                            <Star size={starSize} filled="full" />
                        ) : (
                            <Star size={starSize} filled="none" />
                        )}
                    </label>
                </>
            ))}
        </div>
    )
}

interface StarProps {
    size: 3.5 | 6
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
