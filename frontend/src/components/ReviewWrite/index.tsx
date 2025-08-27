import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useAppContext } from '@/contexts/AppContext'
import { getCurrentUser } from '@/auth'
import { useQuery } from '@tanstack/react-query'
import { userQueryOptions } from '@/queryOptions'
import { FormModal } from '../ui'
import ReviewContent from './Content'
import Buttons from './Buttons'
import { writeReviewMutation } from './mutations'

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
    const [routeLink, setRouteLink] = useState<string>('')
    const queryClient = useQueryClient()
    const routeLinkMaxLength = 250
    const { data: userData } = useQuery(userQueryOptions(getCurrentUser()?.uid))

    const writeReview = writeReviewMutation(
        dispatch,
        queryClient,
        userData?.userId ?? -1
    )

    // const writeReviewMutation = useMutation({
    //     mutationFn: (review: {
    //         place: Place
    //         rating: number
    //         experienceDate: string
    //         routeLink: string | null
    //     }) =>
    //         createReview(
    //             userData?.userId ?? -1,
    //             review.place,
    //             review.experienceDate,
    //             review.rating,
    //             review.routeLink
    //         ),
    //     onSuccess: (data: { place_id: number; is_new_place: boolean }) => {
    //         if (data.is_new_place)
    //             queryClient.invalidateQueries({ queryKey: ['places'] })

    //         queryClient.invalidateQueries({
    //             queryKey: ['reviews', data.place_id],
    //         })
    //         dispatch({
    //             type: 'CHANGE_SELECTED_PLACE',
    //             payload: { placeId: data.place_id, lat: -999, lng: -999 },
    //         })

    //         dispatch({
    //             type: 'SHOW_ALERT_SCREEN',
    //             payload: {
    //                 message: 'Review created',
    //                 type: 'success',
    //                 timeToHide: defaults.alertScreenTimeToHide,
    //             },
    //         })
    //     },
    //     onError: () => {
    //         dispatch({
    //             type: 'SHOW_ALERT_SCREEN',
    //             payload: {
    //                 message: 'Error creating review',
    //                 type: 'error',
    //                 timeToHide: defaults.alertScreenTimeToHide,
    //             },
    //         })
    //     },
    // })

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

    const handleCancel = () => {
        hideWriteReview()
        setRating(0)
        resetExperinceDate()
        setRouteLink('')
    }
    const handlePost = (e: React.FormEvent) => {
        e.preventDefault()
        writeReview.mutate({
            place: state.selectedPlace ?? { placeId: -1, lat: 0, lng: 0 },
            experienceDate: experienceDate,
            rating: rating,
            routeLink: routeLink !== '' ? routeLink : null,
        })

        handleCancel()
    }

    return (
        <FormModal
            title="Write a review"
            isModalOpen={isShow}
            closeModal={handleCancel}
        >
            <form className="flex flex-col gap-4 mt-1" onSubmit={handlePost}>
                <ReviewContent
                    experienceDate={experienceDate}
                    handleExperienceDateChange={handleExperienceDateChange}
                    rating={rating}
                    handleRatingChange={handleRatingChange}
                    routeLink={routeLink}
                    handleRouteLinkChange={handleRouteLinkChange}
                    routeLinkMaxLength={routeLinkMaxLength}
                />
                <Buttons
                    handleCancel={handleCancel}
                    isPostDisabled={
                        rating === 0 || routeLink.length > routeLinkMaxLength
                    }
                />
            </form>
        </FormModal>
    )
}
