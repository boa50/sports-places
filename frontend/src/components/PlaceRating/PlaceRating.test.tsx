import PlaceRating from './PlaceRating'
import { screen, act } from '@testing-library/react'
import { customRender, mockApiCalls, testVariables } from '@/test/utils'

vi.mock('../ui', () => {
    return {
        RatingStars: ({ rating }: { rating: number }) => (
            <div data-testid="rating-stars">{rating}</div>
        ),
    }
})

mockApiCalls()

test('display with zero reviews', async () => {
    await act(async () => {
        customRender(<PlaceRating />, {
            // @ts-ignore Not testing all the states
            state: { selectedPlace: { placeId: -1 } },
            dispatch: vi.fn(),
        })
    })

    expect(screen.queryByTestId('total-score')).toBeNull()
    expect(screen.queryByTestId('rating-stars')).toBeNull()
    expect(screen.queryByTestId('total-reviews')).toBeNull()
})

test('display with 1 review', async () => {
    const nReviews = 1

    await act(async () => {
        customRender(<PlaceRating />, {
            // @ts-ignore Not testing all the states
            state: { selectedPlace: { placeId: nReviews } },
            dispatch: vi.fn(),
        })
    })

    const ratingStarsComponent = screen.getByTestId('rating-stars')

    expect(screen.queryByTestId('total-score')).toBeDefined()
    expect(screen.queryByTestId('total-score')?.textContent).toContain(
        testVariables.reviewDefaultRating
    )
    expect(ratingStarsComponent).toBeDefined()
    expect(ratingStarsComponent.textContent).toBe(
        testVariables.reviewDefaultRating.toString()
    )
    expect(screen.queryByTestId('total-reviews')).toBeDefined()
    expect(screen.queryByTestId('total-reviews')?.textContent).toContain(
        nReviews
    )
})

test('display with many reviews', async () => {
    const nReviews = 10

    await act(async () => {
        customRender(<PlaceRating />, {
            // @ts-ignore Not testing all the states
            state: { selectedPlace: { placeId: nReviews } },
            dispatch: vi.fn(),
        })
    })

    const ratingStarsComponent = screen.getByTestId('rating-stars')

    expect(screen.queryByTestId('total-score')).toBeDefined()
    expect(screen.queryByTestId('total-score')?.textContent).toContain(
        testVariables.reviewDefaultRating
    )
    expect(ratingStarsComponent).toBeDefined()
    expect(ratingStarsComponent.textContent).toBe(
        testVariables.reviewDefaultRating.toString()
    )
    expect(screen.queryByTestId('total-reviews')).toBeDefined()
    expect(screen.queryByTestId('total-reviews')?.textContent).toContain(
        nReviews
    )
})
