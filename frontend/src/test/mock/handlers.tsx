import { http, HttpResponse } from 'msw'
import { testVariables } from '../utils'

export const handlers = [
    http.get('http://apiMock.com/users', ({ request }) => {
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
