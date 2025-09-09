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

    expect(screen.queryByTestId('total-score')).not.toBeInTheDocument()
    expect(screen.queryByTestId('rating-stars')).not.toBeInTheDocument()
    expect(screen.queryByTestId('total-reviews')).not.toBeInTheDocument()
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

    expect(screen.queryByTestId('total-score')).toBeInTheDocument()
    expect(screen.queryByTestId('total-score')).toHaveTextContent(
        testVariables.reviewDefaultRating.toString()
    )
    expect(ratingStarsComponent).toBeInTheDocument()
    expect(ratingStarsComponent).toHaveTextContent(
        testVariables.reviewDefaultRating.toString()
    )
    expect(screen.queryByTestId('total-reviews')).toBeInTheDocument()
    expect(screen.queryByTestId('total-reviews')).toHaveTextContent(
        nReviews.toString()
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

    expect(screen.queryByTestId('total-score')).toBeInTheDocument()
    expect(screen.queryByTestId('total-score')).toHaveTextContent(
        testVariables.reviewDefaultRating.toString()
    )
    expect(ratingStarsComponent).toBeInTheDocument()
    expect(ratingStarsComponent).toHaveTextContent(
        testVariables.reviewDefaultRating.toString()
    )
    expect(screen.queryByTestId('total-reviews')).toBeInTheDocument()
    expect(screen.queryByTestId('total-reviews')).toHaveTextContent(
        nReviews.toString()
    )
})
