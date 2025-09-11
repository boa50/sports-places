import ReviewWrite from './ReviewWrite'
import { defaults } from '../defaults'
import { screen, fireEvent, act } from '@testing-library/react'
import { customRender, testVariables } from '@/test/utils'
import userEvent from '@testing-library/user-event'

vi.mock('@/auth', () => {
    return {
        getCurrentUser: vi.fn(),
    }
})

vi.mock('./Content/IsTrustedUrl', () => {
    return {
        default: () => <div data-testid="is-trusted-url"></div>,
    }
})

vi.mock(import('@/components/ui'), async (importOriginal) => {
    const mod = await importOriginal()

    return {
        ...mod,
        RatingStarsInteractive: ({
            rating,
            handleChange,
        }: {
            rating: number
            handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
        }) => (
            <input
                type="text"
                data-testid="rating-stars-interactive"
                value={rating}
                onChange={handleChange}
            />
        ),
    }
})

vi.mock(import('@tanstack/react-query'), async (importOriginal) => {
    const mod = await importOriginal()

    return {
        ...mod,
        useQueryClient: vi.fn(),
    }
})

test('initial state components display', async () => {
    customRender(<ReviewWrite isShow={true} hideWriteReview={vi.fn()} />, {
        state: {},
        dispatch: vi.fn(),
    })

    await screen.findByTestId('review-write-content')
    await screen.findByTestId('review-write-buttons')

    expect(screen.getByTestId('review-write-content')).toBeInTheDocument()
    expect(screen.getByTestId('review-write-buttons')).toBeInTheDocument()
})

test('cancel review write', async () => {
    const mockHideWriteReview = vi.fn()
    customRender(
        <ReviewWrite isShow={true} hideWriteReview={mockHideWriteReview} />,
        {
            state: {},
            dispatch: vi.fn(),
        }
    )

    const user = userEvent.setup()
    const rating = '3'
    const experienceDate = '2020-01-15'
    const routeLink = 'http://route-link.com'

    await screen.findByTestId('review-write-content')
    await screen.findByTestId('review-write-buttons')

    const ratingStarsComponent = screen.getByTestId('rating-stars-interactive')
    const experienceDateInputComponent =
        screen.getByLabelText(/experience date/i)
    const routeLinkInputComponent = screen.getByRole('textbox', {
        name: /route link/i,
    })

    // Using the fireEvent function to make the typing run faster
    fireEvent.change(ratingStarsComponent, { target: { value: rating } })
    expect(ratingStarsComponent).toHaveValue(rating)

    // Using the fireEvent function to make the typing run faster
    fireEvent.change(experienceDateInputComponent, {
        target: { value: experienceDate },
    })
    expect(experienceDateInputComponent).toHaveValue(experienceDate)

    // Using the fireEvent function to make the typing run faster
    fireEvent.change(routeLinkInputComponent, { target: { value: routeLink } })
    expect(routeLinkInputComponent).toHaveValue(routeLink)

    await user.click(
        screen.getByRole('button', {
            name: /cancel/i,
        })
    )

    expect(mockHideWriteReview).toHaveBeenCalledOnce()
    expect(ratingStarsComponent).toHaveValue('0')
    expect(experienceDateInputComponent).toHaveValue(
        new Date().toISOString().slice(0, 10)
    )
    expect(routeLinkInputComponent).toHaveValue('')
})

test('disabling posting review without rating', async () => {
    customRender(<ReviewWrite isShow={true} hideWriteReview={vi.fn()} />, {
        state: {},
        dispatch: vi.fn(),
    })

    await screen.findByTestId('review-write-content')
    await screen.findByTestId('review-write-buttons')

    expect(screen.getByTestId('rating-stars-interactive')).toHaveValue('0')
    expect(
        screen.getByRole('button', {
            name: /post/i,
        })
    ).toBeDisabled()
})

test('disabling posting review with too long route link', async () => {
    customRender(<ReviewWrite isShow={true} hideWriteReview={vi.fn()} />, {
        state: {},
        dispatch: vi.fn(),
    })

    const routeLink = 'http://route-link.com/' + 'a'.repeat(250)

    await screen.findByTestId('review-write-content')
    await screen.findByTestId('review-write-buttons')

    const routeLinkInputComponent = screen.getByRole('textbox', {
        name: /route link/i,
    })

    // Using the fireEvent function to make the typing run faster
    fireEvent.change(routeLinkInputComponent, { target: { value: routeLink } })

    expect(
        screen.getByRole('button', {
            name: /post/i,
        })
    ).toBeDisabled()
})

test('submitting posting review', async () => {
    const placeId = testVariables.validPlaceId
    const {
        mockDispatch,
        mockInvalidateQueries,
        getCurrentUser,
        useQueryClient,
    } = await submitReview(placeId)

    expect(mockInvalidateQueries).toHaveBeenCalledExactlyOnceWith({
        queryKey: ['reviews', placeId],
    })

    expect(mockDispatch).toHaveBeenCalledTimes(2)
    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'CHANGE_SELECTED_PLACE',
        payload: { placeId: placeId, lat: -999, lng: -999 },
    })
    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SHOW_ALERT_SCREEN',
        payload: {
            message: 'Review created',
            type: 'success',
            timeToHide: defaults.alertScreenTimeToHide,
        },
    })

    submitReviewResetMocks(getCurrentUser, useQueryClient)
})

test('submitting posting review new place', async () => {
    const placeId = testVariables.validPlaceIdNewPlaceInsert
    const {
        mockDispatch,
        mockInvalidateQueries,
        getCurrentUser,
        useQueryClient,
    } = await submitReview(placeId)

    expect(mockInvalidateQueries).toHaveBeenCalledTimes(2)
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
        queryKey: ['places'],
    })
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
        queryKey: ['reviews', placeId],
    })

    expect(mockDispatch).toHaveBeenCalledTimes(2)
    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'CHANGE_SELECTED_PLACE',
        payload: { placeId: placeId, lat: -999, lng: -999 },
    })
    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SHOW_ALERT_SCREEN',
        payload: {
            message: 'Review created',
            type: 'success',
            timeToHide: defaults.alertScreenTimeToHide,
        },
    })

    submitReviewResetMocks(getCurrentUser, useQueryClient)
})

test('submitting posting review error', async () => {
    const placeId = testVariables.invalidPlaceId
    const {
        mockDispatch,
        mockInvalidateQueries,
        getCurrentUser,
        useQueryClient,
    } = await submitReview(placeId)

    expect(mockInvalidateQueries).not.toHaveBeenCalled()

    expect(mockDispatch).toHaveBeenCalledExactlyOnceWith({
        type: 'SHOW_ALERT_SCREEN',
        payload: {
            message: 'Error creating review',
            type: 'error',
            timeToHide: defaults.alertScreenTimeToHide,
        },
    })

    submitReviewResetMocks(getCurrentUser, useQueryClient)
})

async function submitReview(placeId: number) {
    const { getCurrentUser } = await import('@/auth')
    // @ts-ignore Not mocking all the properties
    vi.mocked(getCurrentUser).mockImplementation(() => ({
        uid: testVariables.validUserProviderId,
    }))

    const mockInvalidateQueries = vi.fn()
    const { useQueryClient } = await import('@tanstack/react-query')
    // @ts-ignore Not mocking all the properties
    vi.mocked(useQueryClient).mockImplementation(() => ({
        invalidateQueries: mockInvalidateQueries,
    }))

    const mockDispatch = vi.fn()
    await act(async () => {
        customRender(<ReviewWrite isShow={true} hideWriteReview={vi.fn()} />, {
            state: {
                selectedPlace: {
                    placeId: placeId,
                    lat: -1,
                    lng: 2,
                },
            },
            dispatch: mockDispatch,
        })
    })

    const user = userEvent.setup()
    const rating = '3'
    const experienceDate = '2020-01-15'
    const routeLink = 'http://route-link.com'

    await screen.findByTestId('review-write-content')
    await screen.findByTestId('review-write-buttons')

    const ratingStarsComponent = screen.getByTestId('rating-stars-interactive')
    const experienceDateInputComponent =
        screen.getByLabelText(/experience date/i)
    const routeLinkInputComponent = screen.getByRole('textbox', {
        name: /route link/i,
    })

    // Using the fireEvent function to make the typing run faster
    fireEvent.change(ratingStarsComponent, { target: { value: rating } })
    expect(ratingStarsComponent).toHaveValue(rating)

    // Using the fireEvent function to make the typing run faster
    fireEvent.change(experienceDateInputComponent, {
        target: { value: experienceDate },
    })
    expect(experienceDateInputComponent).toHaveValue(experienceDate)

    // Using the fireEvent function to make the typing run faster
    fireEvent.change(routeLinkInputComponent, { target: { value: routeLink } })
    expect(routeLinkInputComponent).toHaveValue(routeLink)

    await user.click(
        screen.getByRole('button', {
            name: /post/i,
        })
    )

    return {
        mockDispatch,
        mockInvalidateQueries,
        getCurrentUser,
        useQueryClient,
    }
}

async function submitReviewResetMocks(
    getCurrentUser: any,
    useQueryClient: any
) {
    vi.mocked(getCurrentUser).mockReset()
    vi.mocked(useQueryClient).mockReset()
}
