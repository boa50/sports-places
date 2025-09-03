import { render, type RenderOptions } from '@testing-library/react'
import { AppContext, AppProvider } from '@/contexts/AppContext'
import type { AppState } from '@/types'

interface Props {
    children: React.ReactNode
    contextValue: { state: AppState; dispatch: () => any }
}

const CustomProvider = ({ children, contextValue }: Props) => {
    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export const customRender = (
    ui: React.ReactNode,
    context?: { state: AppState; dispatch: () => any },
    options?: RenderOptions
) => {
    if (context === undefined) return render(ui, { wrapper: AppProvider })

    return render(ui, {
        wrapper: (props) => (
            <CustomProvider contextValue={context} {...props} />
        ),
        ...options,
    })
}
