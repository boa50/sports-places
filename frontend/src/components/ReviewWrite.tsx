import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createReview } from '../api'
import { useAppContext } from '../contexts/AppContext'
import { RatingStarsInteractive } from './ui/RatingStars'
import { defaults } from './defaults'
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
    const [routeLink, setRouteLink] = useState<string | undefined>()
    const queryClient = useQueryClient()

    const writeReviewMutation = useMutation({
        mutationFn: (review: {
            userId: number
            place: Place
            rating: number
            experienceDate: string
            routeLink?: string
        }) =>
            createReview(
                review.userId,
                review.place,
                review.experienceDate,
                review.rating,
                review.routeLink
            ),
        onSuccess: (data: { place_id: number; is_new_place: boolean }) => {
            if (data.is_new_place)
                queryClient.invalidateQueries({ queryKey: ['places'] })

            queryClient.invalidateQueries({
                queryKey: ['reviews', data.place_id],
            })
            dispatch({
                type: 'CHANGE_SELECTED_PLACE',
                payload: { placeId: data.place_id, lat: -999, lng: -999 },
            })

            dispatch({
                type: 'SHOW_ALERT_SCREEN',
                payload: {
                    message: 'Review created',
                    type: 'success',
                    timeToHide: defaults.alertScreenTimeToHide,
                },
            })
        },
        onError: () => {
            dispatch({
                type: 'SHOW_ALERT_SCREEN',
                payload: {
                    message: 'Error creating review',
                    type: 'error',
                    timeToHide: defaults.alertScreenTimeToHide,
                },
            })
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
    const handleRouteLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRouteLink(e.target.value)
    }

    const handlePost = (e: React.FormEvent) => {
        e.preventDefault()
        writeReviewMutation.mutate({
            userId: 1,
            place: state.selectedPlace ?? { placeId: -1, lat: 0, lng: 0 },
            experienceDate: experienceDate,
            rating: rating,
            routeLink: routeLink,
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
                                    routeLink={routeLink}
                                    handleRouteLinkChange={
                                        handleRouteLinkChange
                                    }
                                />
                                <Buttons
                                    handleCancel={handleCancel}
                                    rating={rating}
                                />
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
    routeLink?: string
    handleRouteLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function ReviewContent({
    experienceDate,
    handleExperienceDateChange,
    rating,
    handleRatingChange,
    routeLink,
    handleRouteLinkChange,
}: ReviewContentProps) {
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
                    className="border rounded-lg p-1 focus:outline-sky-700"
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
                    className="border rounded-lg p-1 focus:outline-sky-700"
                    placeholder="Put your route url here"
                    value={routeLink}
                    onChange={handleRouteLinkChange}
                />
            </div>
        </div>
    )
}

interface RatingsProps {
    rating: number
    handleRatingChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Ratings({ rating, handleRatingChange }: RatingsProps) {
    return (
        <div className="flex flex-col items-center justify-center">
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
    rating: number
}

function Buttons({ handleCancel, rating }: ButtonsProps) {
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
                                    text-white bg-sky-600 hover:bg-sky-600/90
                                    disabled:text-gray-100 disabled:bg-gray-400 disabled:cursor-default"
                disabled={rating === 0}
            >
                Post
            </button>
        </div>
    )
}
