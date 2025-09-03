import AlertScreen from './AlertScreen'
import { AppProvider, AppContext } from '@/contexts/AppContext'
import { render, screen } from '@testing-library/react'

test('load alert screen', async () => {
    render(
        <AppProvider>
            <AlertScreen message="any message" type="info" />
        </AppProvider>
    )

    await screen.findByRole('alert')

    expect(screen.getByRole('alert')).toBeDefined()
})

test('right text message', async () => {
    const definedTextMessage = 'Some interesting text message'

    render(
        <AppProvider>
            <AlertScreen message={definedTextMessage} type="info" />
        </AppProvider>
    )

    await screen.findByRole('alert')

    expect(screen.getByRole('alert').textContent).toEqual(definedTextMessage)
})

test('call to hide alert screen', async () => {
    const timeToHide = 500
    const mockDispatch = vi.fn()

    vi.useFakeTimers()

    render(
        <AppContext.Provider
            value={{
                // @ts-ignore Not testing the context state
                state: {},
                dispatch: mockDispatch,
            }}
        >
            <AlertScreen
                message="any random message"
                type="info"
                timeToHide={timeToHide}
            />
        </AppContext.Provider>
    )

    vi.advanceTimersByTime(timeToHide - 1)

    expect(mockDispatch).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'HIDE_ALERT_SCREEN' })

    vi.useRealTimers()
})
