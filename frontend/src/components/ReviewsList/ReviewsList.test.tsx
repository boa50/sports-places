import ReviewsList from './ReviewsList'
import { screen } from '@testing-library/react'
import { customRender, mockApiCalls } from '@/test/utils'
import type { Review } from '@/types'

vi.mock('../Review', () => {
    return {
        default: ({ review }: { review: Review }) => (
            <div data-testid="review">{review.userDisplayName}</div>
        ),
    }
})

vi.mock('../ui', () => {
    return {
        Spinner: () => <div data-testid="spinner">Loading...</div>,
    }
})

mockApiCalls()

test('showing zero reviews', async () => {
    customRender(<ReviewsList />, {
        // @ts-ignore Not testing all the states
        state: { selectedPlace: { placeId: -1 } },
        dispatch: vi.fn(),
    })

    expect(screen.getByTestId('spinner')).toBeInTheDocument()

    await screen.findByRole('list')

    expect(screen.queryByTestId('review')).not.toBeInTheDocument()
})

test('showing one review', async () => {
    const nReviews = 1

    customRender(<ReviewsList />, {
        // @ts-ignore Not testing all the states
        state: { selectedPlace: { placeId: nReviews } },
        dispatch: vi.fn(),
    })

    expect(screen.getByTestId('spinner')).toBeInTheDocument()

    await screen.findByRole('list')

    const reviews = screen.getAllByTestId('review')
    expect(reviews.length).toBe(nReviews)
    reviews.forEach((review) => {
        expect(review).toBeInTheDocument()
    })
})

test('showing many reviews', async () => {
    const nReviews = 2

    customRender(<ReviewsList />, {
        // @ts-ignore Not testing all the states
        state: { selectedPlace: { placeId: nReviews } },
        dispatch: vi.fn(),
    })

    expect(screen.getByTestId('spinner')).toBeInTheDocument()

    await screen.findByRole('list')

    const reviews = screen.getAllByTestId('review')
    expect(reviews.length).toBe(nReviews)
    reviews.forEach((review) => {
        expect(review).toBeInTheDocument()
    })
})
