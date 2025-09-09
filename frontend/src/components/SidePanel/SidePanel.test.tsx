import SidePanel from './SidePanel'
import { screen, fireEvent } from '@testing-library/react'
import { customRender, mockApiCalls } from '@/test/utils'

vi.mock('../ReviewsList', () => {
    return {
        default: () => <div data-testid="reviews-list"></div>,
    }
})

vi.mock('../PlaceRating', () => {
    return {
        default: () => <div data-testid="place-rating"></div>,
    }
})

mockApiCalls()

test('panel closed state desktop', async () => {
    customRender(<SidePanel showWriteReview={vi.fn()} />, {
        state: { isMobile: false, isOpenPanel: false },
        dispatch: vi.fn(),
    })

    await screen.findByRole('complementary')

    expect(screen.getByRole('complementary')).toBeInTheDocument()
    expect(screen.getByRole('complementary')).toHaveClass('-translate-x-full')
    expect(screen.getByRole('complementary')).toHaveProperty(
        'ariaExpanded',
        'false'
    )
})

test('panel closed state mobile', async () => {
    customRender(<SidePanel showWriteReview={vi.fn()} />, {
        state: { isMobile: true, isOpenPanel: false },
        dispatch: vi.fn(),
    })

    await screen.findByRole('complementary')

    expect(screen.getByRole('complementary')).toBeInTheDocument()
    expect(screen.getByRole('complementary')).toHaveClass('translate-y-full')
    expect(screen.getByRole('complementary')).toHaveProperty(
        'ariaExpanded',
        'false'
    )
})

test('panel open state desktop', async () => {
    customRender(<SidePanel showWriteReview={vi.fn()} />, {
        state: { isMobile: false, isOpenPanel: true },
        dispatch: vi.fn(),
    })

    await screen.findByRole('complementary')

    expect(screen.getByRole('complementary')).toBeInTheDocument()
    expect(screen.getByRole('complementary')).toHaveClass('translate-x-0')
    expect(screen.getByRole('complementary')).toHaveProperty(
        'ariaExpanded',
        'true'
    )

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
})

test('panel open state mobile', async () => {
    customRender(<SidePanel showWriteReview={vi.fn()} />, {
        state: { isMobile: true, isOpenPanel: true },
        dispatch: vi.fn(),
    })

    await screen.findByRole('complementary')

    expect(screen.getByRole('complementary')).toBeInTheDocument()
    expect(screen.getByRole('complementary')).toHaveClass('translate-y-0')
    expect(screen.getByRole('complementary')).toHaveProperty(
        'ariaExpanded',
        'true'
    )

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
})

test('close button click', async () => {
    const mockDispatch = vi.fn()

    customRender(<SidePanel showWriteReview={vi.fn()} />, {
        state: { isOpenPanel: true },
        dispatch: mockDispatch,
    })

    await screen.findByRole('complementary')

    const closeBtn = screen.getByRole('button', { name: 'Close' })
    expect(closeBtn).toBeInTheDocument()

    fireEvent.click(closeBtn)

    expect(mockDispatch).toHaveBeenCalledTimes(3)
    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'CLOSE_PANEL',
    })
    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'HIDE_NEW_PLACE_MARKER',
    })
    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'CLEAR_SELECTED_PLACE',
    })
})

test('signed out user write review try', async () => {
    const mockShowWriteReview = vi.fn()

    customRender(<SidePanel showWriteReview={mockShowWriteReview} />, {
        state: { isOpenPanel: true, isUserSignedIn: false },
        dispatch: vi.fn(),
    })

    await screen.findByRole('complementary')

    const writeReviewBtn = screen.getByRole('button', {
        name: 'Please sign in before writing a review',
    })
    expect(writeReviewBtn).toBeInTheDocument()
    expect(writeReviewBtn).toHaveProperty('disabled', true)

    fireEvent.click(writeReviewBtn)

    expect(mockShowWriteReview).not.toHaveBeenCalled()
})

test('signed in user write review try', async () => {
    const mockShowWriteReview = vi.fn()

    customRender(<SidePanel showWriteReview={mockShowWriteReview} />, {
        state: { isOpenPanel: true, isUserSignedIn: true },
        dispatch: vi.fn(),
    })

    await screen.findByRole('complementary')

    const writeReviewBtn = screen.getByRole('button', {
        name: 'Write a review',
    })
    expect(writeReviewBtn).toBeInTheDocument()
    expect(writeReviewBtn).toHaveProperty('disabled', false)

    fireEvent.click(writeReviewBtn)

    expect(mockShowWriteReview).toHaveBeenCalledOnce()
})

test('show place without reviews', async () => {
    customRender(<SidePanel showWriteReview={vi.fn()} />, {
        // @ts-ignore Not testing all the states
        state: { isOpenPanel: true, selectedPlace: { placeId: -1 } },
        dispatch: vi.fn(),
    })

    await screen.findByRole('complementary')

    expect(screen.queryByTestId('place-rating')).not.toBeInTheDocument()
    expect(screen.queryByTestId('reviews-list')).not.toBeInTheDocument()
    expect(screen.getByTestId('no-reviews-list')).toBeInTheDocument()
})

test('show places with reviews', async () => {
    customRender(<SidePanel showWriteReview={vi.fn()} />, {
        // @ts-ignore Not testing all the states
        state: { isOpenPanel: true, selectedPlace: { placeId: 1 } },
        dispatch: vi.fn(),
    })

    await screen.findByRole('complementary')

    expect(screen.getByTestId('place-rating')).toBeInTheDocument()
    expect(screen.getByTestId('reviews-list')).toBeInTheDocument()
    expect(screen.queryByTestId('no-reviews-list')).not.toBeInTheDocument()
})
