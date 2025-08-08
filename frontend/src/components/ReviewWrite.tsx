import { useState } from 'react'
import { RatingStarsInteractive } from './ui/RatingStars'
import { createReview } from '../api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAppContext } from '../contexts/AppContext'
import type { Place } from '../types'

interface Props {
    isShow: boolean
    hideWriteReview: () => void
}

export default function ReviewWrite({ isShow, hideWriteReview }: Props) {
    const { state, dispatch } = useAppContext()
    const [rating, setRating] = useState<number>(0)
    const [experienceDate, setExperienceDate] = useState<string>(
        new Date().toISOString().slice(0, 10)
    )
    const queryClient = useQueryClient()

    const writeReviewMutation = useMutation({
        mutationFn: (review: {
            user_id: number
            place: Place
            rating: number
            experience_date: string
        }) =>
            createReview(
                review.user_id,
                review.place,
                review.experience_date,
                review.rating
            ),
        onSuccess: (data: { place_id: number; is_new_place: boolean }) => {
            if (data.is_new_place)
                queryClient.invalidateQueries({ queryKey: ['places'] })

            queryClient.invalidateQueries({
                queryKey: ['reviews', data.place_id],
            })
            dispatch({
                type: 'CHANGE_SELECTED_PLACE',
                payload: { place_id: data.place_id, lat: -999, lng: -999 },
            })
            console.info('Review created')
        },
        onError: (error) => {
            console.error('Error creating review')
        },
    })

    const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRating(parseInt(e.target.value))
    }
    const handleExperienceDateChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setExperienceDate(e.target.value)
    }
    const resetExperinceDate = () => {
        setExperienceDate(new Date().toISOString().slice(0, 10))
    }

    const handlePost = (e: React.FormEvent) => {
        e.preventDefault()
        writeReviewMutation.mutate({
            user_id: 1,
            place: state.selectedPlace ?? { place_id: -1, lat: 0, lng: 0 },
            experience_date: experienceDate,
            rating: rating,
        })

        hideWriteReview()
        setRating(0)
        resetExperinceDate()
    }
    const handleCancel = () => {
        hideWriteReview()
        setRating(0)
        resetExperinceDate()
    }

    return (
        isShow && (
            <div className="fixed z-1500 flex items-center justify-center bg-gray-900/30 w-screen h-screen">
                <div
                    id="crud-modal"
                    aria-hidden="true"
                    className="z-1000 overflow-y-auto overflow-x-hidden flex top-0 right-0 left-0 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow-sm p-4">
                            <Header />
                            <form
                                className="flex flex-col gap-4 mt-1"
                                onSubmit={handlePost}
                            >
                                <ReviewContent
                                    experienceDate={experienceDate}
                                    handleExperienceDateChange={
                                        handleExperienceDateChange
                                    }
                                    rating={rating}
                                    handleRatingChange={handleRatingChange}
                                />
                                <Buttons handleCancel={handleCancel} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

function Header() {
    return (
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Review</h3>
        </div>
    )
}

interface ReviewContentProps {
    experienceDate: string
    handleExperienceDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    rating: number
    handleRatingChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function ReviewContent({
    experienceDate,
    handleExperienceDateChange,
    rating,
    handleRatingChange,
}: ReviewContentProps) {
    return (
        <div className="flex flex-col">
            <div className="flex gap-2 text-gray-500 justify-center text-sm">
                <div className="self-center">Date of the experience:</div>
                <input
                    type="date"
                    name="experience-date"
                    className="border rounded-lg p-1 focus:outline-sky-700"
                    value={experienceDate}
                    onChange={handleExperienceDateChange}
                ></input>
            </div>
            <Ratings rating={rating} handleRatingChange={handleRatingChange} />
        </div>
    )
}

interface RatingsProps {
    rating: number
    handleRatingChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Ratings({ rating, handleRatingChange }: RatingsProps) {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <RatingStarsInteractive
                rating={rating}
                size="normal"
                handleChange={handleRatingChange}
            />
        </div>
    )
}

interface ButtonsProps {
    handleCancel: () => void
}

function Buttons({ handleCancel }: ButtonsProps) {
    return (
        <div className="flex gap-2 justify-end">
            <button
                type="button"
                aria-label="Cancel"
                title="Cancel"
                onClick={handleCancel}
                className="w-20 cursor-pointer font-medium rounded-lg text-sm p-2.5 focus:outline-none
                                    text-sky-700 bg-transparent hover:bg-gray-950/5 border border-sky-700"
            >
                Cancel
            </button>
            <button
                type="submit"
                aria-label="Post"
                title="Post"
                className="w-20 cursor-pointer font-medium rounded-lg text-sm p-2.5 focus:outline-none
                                    text-white bg-sky-600 hover:bg-sky-600/90"
            >
                Post
            </button>
        </div>
    )
}
