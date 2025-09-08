import { http, HttpResponse } from 'msw'
import { testVariables } from '../utils'

const apiUrl = 'http://apimock.com'

export const handlers = [
    http.get(`${apiUrl}/users`, ({ request }) => {
        const url = new URL(request.url)
        const userProviderId = url.searchParams.get('user_provider_id')

        if (userProviderId === testVariables.validUserProviderId)
            return HttpResponse.json([
                {
                    user_id: 1,
                    avatar_url: null,
                    display_name: testVariables.validUserDisplayName,
                },
            ])

        if (userProviderId === testVariables.validUserProviderIdCustomAvatar)
            return HttpResponse.json([
                {
                    user_id: 2,
                    avatar_url: testVariables.customAvatarUrl,
                    display_name: testVariables.validUserDisplayName,
                },
            ])

        return HttpResponse.json([])
    }),
    http.get(`${apiUrl}/avatarUrl`, ({ request }) => {
        const url = new URL(request.url)
        const avatarDescription = url.searchParams.get('avatar_description')

        return HttpResponse.json([
            {
                url: avatarDescription,
            },
        ])
    }),
    http.get(`${apiUrl}/reviews`, ({ request }) => {
        const url = new URL(request.url)
        const placeId = url.searchParams.get('place_id')

        if (placeId === '-1') return HttpResponse.json([])

        const reviews = [...Array(parseInt(placeId ?? '0')).keys()].map(() => ({
            userDisplayName: 'some name',
            userAvatarDescription: 'some avatar',
            experienceDate: testVariables.reviewDefaultDateAPI,
            rating: testVariables.reviewDefaultRating,
        }))

        return HttpResponse.json(reviews)
    }),
    http.get(`${apiUrl}/places`, () => {
        const places = [...Array(testVariables.numberOfPlaces).keys()].map(
            (k) => ({
                placeId: k + 1,
                lat: k,
                lng: k - 1,
            })
        )

        return HttpResponse.json(places)
    }),
]
