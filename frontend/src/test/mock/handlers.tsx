import { http, HttpResponse } from 'msw'
import { testVariables } from '../utils'

const apiUrl = 'http://apimock.com/api'

export const handlers = [
    http.get(`${apiUrl}/users`, ({ request }) => {
        const url = new URL(request.url)
        const userProviderId = url.searchParams.get('user_provider_id')

        if (userProviderId !== testVariables.validUserProviderId)
            return HttpResponse.json([])

        return HttpResponse.json([
            {
                user_id: 1,
                avatar_url: 'red',
                display_name: testVariables.validUserDisplayName,
            },
        ])
    }),
]
