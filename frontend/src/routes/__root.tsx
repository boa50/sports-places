import {
    createRootRouteWithContext,
    Outlet,
    Link,
} from '@tanstack/react-router'
import { AppProvider } from '../contexts/AppContext'
import type { QueryClient } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
}>()({
    component: RootComponent,
    notFoundComponent: () => {
        return (
            <div>
                <p>This is the notFoundComponent configured on root route</p>
                <Link to="/">Start Over</Link>
            </div>
        )
    },
})

function RootComponent() {
    return (
        <AppProvider>
            <Outlet />
            {/* <ReactQueryDevtools buttonPosition="top-right" /> */}
            {/* <TanStackRouterDevtools position="bottom-right" /> */}
        </AppProvider>
    )
}
