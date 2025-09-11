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
    http.post(`${apiUrl}/review`, async ({ request }) => {
        const postFields = await request.clone().json()

        if (postFields.place_id === testVariables.validPlaceId)
            return HttpResponse.json({
                place_id: postFields.place_id,
                is_new_place: false,
            })
        else if (
            postFields.place_id === testVariables.validPlaceIdNewPlaceInsert
        )
            return HttpResponse.json({
                place_id: postFields.place_id,
                is_new_place: true,
            })

        return new HttpResponse(null, { status: 403 })
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
    http.get(`${apiUrl}/checkLink`, ({ request }) => {
        const url = new URL(request.url)
        const urlParameter = url.searchParams.get('url')

        if (urlParameter === testVariables.trustedRouteLink)
            return HttpResponse.json({ trusted: true })
        else return HttpResponse.json({ trusted: false })
    }),
    http.get(`${apiUrl}/avatars`, () => {
        return HttpResponse.json([
            {
                description: testVariables.avatarListFirstElementDescription,
                url: testVariables.avatarListFirstElementUrl,
            },
            {
                description: 'second',
                url: 'http://www.avatar-second.com',
            },
            {
                description: 'third',
                url: 'http://www.avatar-third.com',
            },
        ])
    }),
]
