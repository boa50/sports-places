import { http, HttpResponse } from 'msw'
import { testVariables } from '../utils'

const apiUrl = 'http://apimock.com/api'

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
        const avatar_description = url.searchParams.get('avatar_description')

        return HttpResponse.json([
            {
                url: avatar_description,
            },
        ])
    }),
]
