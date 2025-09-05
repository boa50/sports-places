import AlertScreen from './AlertScreen'
import { screen } from '@testing-library/react'
import { customRender } from '@/test/utils'

test('load alert screen', async () => {
    customRender(<AlertScreen message="any message" type="info" />)

    await screen.findByRole('alert')

    expect(screen.getByRole('alert')).toBeDefined()
})

test('right text message', async () => {
    const definedTextMessage = 'Some interesting text message'

    customRender(<AlertScreen message={definedTextMessage} type="info" />)

    await screen.findByRole('alert')

    expect(screen.getByRole('alert').textContent).toEqual(definedTextMessage)
})

test('call to hide alert screen', async () => {
    const timeToHide = 500
    const mockDispatch = vi.fn()

    vi.useFakeTimers()

    customRender(
        <AlertScreen
            message="any random message"
            type="info"
            timeToHide={timeToHide}
        />,
        {
            // @ts-ignore Not testing the context state
            state: {},
            dispatch: mockDispatch,
        }
    )

    vi.advanceTimersByTime(timeToHide - 1)

    expect(mockDispatch).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'HIDE_ALERT_SCREEN' })

    vi.useRealTimers()
})
