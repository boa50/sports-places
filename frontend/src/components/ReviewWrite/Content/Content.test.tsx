import ReviewWrite from '../ReviewWrite'
import { screen, fireEvent } from '@testing-library/react'
import { customRender } from '@/test/utils'
import userEvent from '@testing-library/user-event'

vi.mock('@/auth', () => {
    return {
        getCurrentUser: vi.fn(),
    }
})

vi.mock('./Ratings', () => {
    return {
        default: () => <div data-testid="ratings"></div>,
    }
})

vi.mock('./IsTrustedUrl', () => {
    return {
        default: () => <div data-testid="is-trusted-url"></div>,
    }
})

beforeEach(() => {
    customRender(<ReviewWrite isShow={true} hideWriteReview={vi.fn()} />, {
        state: {},
        dispatch: vi.fn(),
    })
})

test('initial state components display', async () => {
    const experienceDateInputComponent =
        screen.getByLabelText(/experience date/i)
    const routeLinkInputComponent = screen.getByRole('textbox', {
        name: /route link/i,
    })

    expect(screen.getByTestId('ratings')).toBeInTheDocument()

    expect(experienceDateInputComponent).toBeInTheDocument()
    expect(experienceDateInputComponent).toBeEnabled()
    expect(experienceDateInputComponent).toHaveAttribute('type', 'date')

    expect(routeLinkInputComponent).toBeInTheDocument()
    expect(routeLinkInputComponent).toBeEnabled()
    expect(routeLinkInputComponent).toHaveAttribute('type', 'url')

    expect(screen.getByTestId('is-trusted-url')).toBeInTheDocument()
    expect(screen.queryByTestId('big-route-link-alert')).not.toBeInTheDocument()
})

test('inserting the experience date', async () => {
    const user = userEvent.setup()
    const experienceDate = '2020-01-15'

    const experienceDateInputComponent =
        screen.getByLabelText(/experience date/i)

    expect(experienceDateInputComponent).toBeInTheDocument()
    await user.clear(experienceDateInputComponent)
    await user.type(experienceDateInputComponent, experienceDate)
    expect(experienceDateInputComponent).toHaveValue(experienceDate)

    expect(screen.getByTestId('is-trusted-url')).toBeInTheDocument()
    expect(screen.queryByTestId('big-route-link-alert')).not.toBeInTheDocument()
})

test('inserting the route link', async () => {
    const user = userEvent.setup()
    const routeLink = 'http://route-link.com'

    const routeLinkInputComponent = screen.getByRole('textbox', {
        name: /route link/i,
    })

    expect(routeLinkInputComponent).toBeInTheDocument()
    await user.type(routeLinkInputComponent, routeLink)
    expect(routeLinkInputComponent).toHaveValue(routeLink)

    expect(screen.getByTestId('is-trusted-url')).toBeInTheDocument()
    expect(screen.queryByTestId('big-route-link-alert')).not.toBeInTheDocument()
})

test('inserting a too big route link', async () => {
    const routeLink = 'http://route-link.com/' + 'a'.repeat(250)

    const routeLinkInputComponent = screen.getByRole('textbox', {
        name: /route link/i,
    })

    expect(routeLinkInputComponent).toBeInTheDocument()
    // Using the fireEvent function to make the typing run faster
    fireEvent.change(routeLinkInputComponent, { target: { value: routeLink } })
    expect(routeLinkInputComponent).toHaveValue(routeLink)

    expect(screen.queryByTestId('is-trusted-url')).not.toBeInTheDocument()
    expect(screen.getByTestId('big-route-link-alert')).toBeInTheDocument()
})
