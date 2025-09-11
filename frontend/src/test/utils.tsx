import { render, type RenderOptions } from '@testing-library/react'
import { AppContext, AppProvider } from '@/contexts/AppContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './mock/server.tsx'
import type { AppState } from '@/types'

interface Props {
    children: React.ReactNode
    contextValue?: { state: Partial<AppState>; dispatch: () => any }
}

const CustomProvider = ({ children, contextValue }: Props) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    })

    if (contextValue === undefined)
        return (
            <QueryClientProvider client={queryClient}>
                <AppProvider>{children}</AppProvider>
            </QueryClientProvider>
        )

    return (
        <QueryClientProvider client={queryClient}>
            {/* @ts-ignore Not testing all state values all the time */}
            <AppContext.Provider value={contextValue}>
                {children}
            </AppContext.Provider>
        </QueryClientProvider>
    )
}

export const customRender = (
    ui: React.ReactNode,
    context?: { state: Partial<AppState>; dispatch: () => any },
    options?: RenderOptions
) => {
    return render(ui, {
        wrapper: (props) => (
            <CustomProvider contextValue={context} {...props} />
        ),
        ...options,
    })
}

export const mockApiCalls = () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())
}

export const testVariables = {
    validUserProviderId: 'someUserProviderId',
    validUserProviderIdCustomAvatar: 'someUserProviderIdCustomAvatar',
    validUserDisplayName: 'First User',
    customAvatarUrl: 'http://www.custom-avatar.com',
    invalidUserProviderId: 'noUserProviderId',
    reviewDefaultDate: new Date(628021800000),
    reviewDefaultDateAPI: 628021800000,
    reviewDefaultRating: 3,
    numberOfPlaces: 2,
    trustedRouteLink: 'http://www.trusted-route-link.com',
    untrustedRouteLink: 'http://www.untrusted-route-link.com',
    validPlaceId: 42,
    validPlaceIdNewPlaceInsert: 27,
    invalidPlaceId: -42,
}
