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
        // @ts-ignore Not testing all the states
        state: { isMobile: false, isOpenPanel: false },
        dispatch: () => {},
    })

    await screen.findByRole('complementary')

    expect(screen.getByRole('complementary')).toBeDefined()
    expect(
        screen
            .getByRole('complementary')
            .classList.contains('-translate-x-full')
    ).toBe(true)
    expect(screen.getByRole('complementary').ariaExpanded).toBe('false')
})

test('panel closed state mobile', async () => {
    customRender(<SidePanel showWriteReview={vi.fn()} />, {
        // @ts-ignore Not testing all the states
        state: { isMobile: true, isOpenPanel: false },
        dispatch: () => {},
    })

    await screen.findByRole('complementary')

    expect(screen.getByRole('complementary')).toBeDefined()
    expect(
        screen.getByRole('complementary').classList.contains('translate-y-full')
    ).toBe(true)
    expect(screen.getByRole('complementary').ariaExpanded).toBe('false')
})

test('panel open state desktop', async () => {
    customRender(<SidePanel showWriteReview={vi.fn()} />, {
        // @ts-ignore Not testing all the states
        state: { isMobile: false, isOpenPanel: true },
        dispatch: () => {},
    })

    await screen.findByRole('complementary')

    expect(screen.getByRole('complementary')).toBeDefined()
    expect(
        screen.getByRole('complementary').classList.contains('translate-x-0')
    ).toBe(true)
    expect(screen.getByRole('complementary').ariaExpanded).toBe('true')

    expect(screen.getByRole('heading', { level: 2 })).toBeDefined()
    expect(screen.getByRole('button', { name: 'Close' })).toBeDefined()
})

test('panel open state mobile', async () => {
    customRender(<SidePanel showWriteReview={vi.fn()} />, {
        // @ts-ignore Not testing all the states
        state: { isMobile: true, isOpenPanel: true },
        dispatch: () => {},
    })

    await screen.findByRole('complementary')

    expect(screen.getByRole('complementary')).toBeDefined()
    expect(
        screen.getByRole('complementary').classList.contains('translate-y-0')
    ).toBe(true)
    expect(screen.getByRole('complementary').ariaExpanded).toBe('true')

    expect(screen.getByRole('heading', { level: 2 })).toBeDefined()
    expect(screen.getByRole('button', { name: 'Close' })).toBeDefined()
})

test('close button click', async () => {
    const mockDispatch = vi.fn()

    customRender(<SidePanel showWriteReview={vi.fn()} />, {
        // @ts-ignore Not testing all the states
        state: { isOpenPanel: true },
        dispatch: mockDispatch,
    })

    await screen.findByRole('complementary')

    const closeBtn = screen.getByRole('button', { name: 'Close' })
    expect(closeBtn).toBeDefined()

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
        // @ts-ignore Not testing all the states
        state: { isOpenPanel: true, isUserSignedIn: false },
        dispatch: vi.fn(),
    })

    await screen.findByRole('complementary')

    const writeReviewBtn = screen.getByRole('button', {
        name: 'Please sign in before writing a review',
    })
    expect(writeReviewBtn).toBeDefined()
    expect(writeReviewBtn).toHaveProperty('disabled', true)

    fireEvent.click(writeReviewBtn)

    expect(mockShowWriteReview).not.toHaveBeenCalled()
})

test('signed in user write review try', async () => {
    const mockShowWriteReview = vi.fn()

    customRender(<SidePanel showWriteReview={mockShowWriteReview} />, {
        // @ts-ignore Not testing all the states
        state: { isOpenPanel: true, isUserSignedIn: true },
        dispatch: vi.fn(),
    })

    await screen.findByRole('complementary')

    const writeReviewBtn = screen.getByRole('button', {
        name: 'Write a review',
    })
    expect(writeReviewBtn).toBeDefined()
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

    expect(screen.queryByTestId('place-rating')).toBeNull()
    expect(screen.queryByTestId('reviews-list')).toBeNull()
    expect(screen.getByTestId('no-reviews-list')).toBeDefined()
})

test('show places with reviews', async () => {
    customRender(<SidePanel showWriteReview={vi.fn()} />, {
        // @ts-ignore Not testing all the states
        state: { isOpenPanel: true, selectedPlace: { placeId: 1 } },
        dispatch: vi.fn(),
    })

    await screen.findByRole('complementary')

    expect(screen.getByTestId('place-rating')).toBeDefined()
    expect(screen.getByTestId('reviews-list')).toBeDefined()
    expect(screen.queryByTestId('no-reviews-list')).toBeNull()
})
