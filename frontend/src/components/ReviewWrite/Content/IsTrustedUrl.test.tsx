import IsTrustedUrl from './IsTrustedUrl'
import { screen } from '@testing-library/react'
import { customRender, testVariables } from '@/test/utils'

vi.mock('@/components/ui', () => {
    return {
        Spinner: () => <div data-testid="loading-component"></div>,
        Icon: ({ type }: { type: 'success' | 'alert' }) => (
            <div data-testid="checked-url-component">{type}</div>
        ),
    }
})

test('initial state without a filled url', async () => {
    customRender(<IsTrustedUrl url={''} />, {
        state: {},
        dispatch: vi.fn(),
    })

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(
        screen.queryByTestId('checked-url-component')
    ).not.toBeInTheDocument()
})

test('validating the url', async () => {
    customRender(<IsTrustedUrl url={testVariables.trustedRouteLink} />, {
        state: {},
        dispatch: vi.fn(),
    })

    await screen.findByTestId('loading-component')

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(
        screen.queryByTestId('checked-url-component')
    ).not.toBeInTheDocument()
})

test('trusted url', async () => {
    vi.useFakeTimers()

    customRender(<IsTrustedUrl url={testVariables.trustedRouteLink} />, {
        state: {},
        dispatch: vi.fn(),
    })

    vi.advanceTimersByTime(1000)
    vi.useRealTimers()

    await screen.findByTestId('checked-url-component')
    expect(screen.getByTestId('checked-url-component')).toBeInTheDocument()
    expect(screen.getByTestId('checked-url-component')).toHaveTextContent(
        'success'
    )

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
})

test('untrusted url', async () => {
    vi.useFakeTimers()

    customRender(<IsTrustedUrl url={testVariables.untrustedRouteLink} />, {
        state: {},
        dispatch: vi.fn(),
    })

    vi.advanceTimersByTime(1000)
    vi.useRealTimers()

    await screen.findByTestId('checked-url-component')
    expect(screen.getByTestId('checked-url-component')).toBeInTheDocument()
    expect(screen.getByTestId('checked-url-component')).toHaveTextContent(
        'alert'
    )

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
})
