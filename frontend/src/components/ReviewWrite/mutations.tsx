import { useMutation } from '@tanstack/react-query'
import { createReview } from '@/api'
import { defaults } from '../defaults'
import type { Place, AppAction } from '@/types'
import type { QueryClient } from '@tanstack/react-query'

export const writeReviewMutation = (
    dispatch: React.Dispatch<AppAction>,
    queryClient: QueryClient,
    userId: number
) =>
    useMutation({
        mutationFn: (review: {
            place: Place
            rating: number
            experienceDate: string
            routeLink: string | null
        }) =>
            createReview(
                userId,
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
