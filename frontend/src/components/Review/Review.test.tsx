import Review from './Review'
import { Suspense } from 'react'
import { screen } from '@testing-library/react'
import { customRender, mockApiCalls } from '@/test/utils'
import type { Review as ReviewType } from '@/types'

vi.mock('../UserAvatar', () => {
    return {
        default: ({ avatarUrl }: { avatarUrl: string }) => (
            <div data-testid="user-avatar">{avatarUrl}</div>
        ),
    }
})

vi.mock('../ui', () => {
    return {
        RatingStars: ({ rating }: { rating: number }) => (
            <div data-testid="rating-stars">{rating}</div>
        ),
        Link: ({ url }: { url: string }) => <div data-testid="link">{url}</div>,
        Icon: ({ type }: { type: string }) => (
            <div data-testid="icon">{type}</div>
        ),
    }
})

vi.mock('@/utils', () => {
    return {
        getRelativeTime: (date: Date) => date.toISOString(),
    }
})

mockApiCalls()

test('standard review', async () => {
    const review: ReviewType = {
        userDisplayName: 'some display name',
        experienceDate: new Date(),
        rating: 5,
        userAvatarDescription: 'desc',
    }

    customRender(
        <Suspense>
            <Review review={review} />
        </Suspense>,
        {
            // @ts-ignore Not testing all the states
            state: {},
            dispatch: vi.fn(),
        }
    )

    await screen.findByTestId('user-avatar')

    const userAvatarComponent = screen.getByTestId('user-avatar')
    const ratingStarsComponent = screen.getByTestId('rating-stars')

    expect(userAvatarComponent).toBeDefined()
    expect(userAvatarComponent.textContent).toBe(review.userAvatarDescription)
    expect(ratingStarsComponent).toBeDefined()
    expect(ratingStarsComponent.textContent).toBe(review.rating.toString())
    expect(screen.getByText(review.userDisplayName)).toBeDefined()
    expect(screen.getByText(review.experienceDate.toISOString())).toBeDefined()
    expect(screen.queryByTestId('link')).toBeNull()
    expect(screen.queryByTestId('icon')).toBeNull()
})

test('review with trusted route link', async () => {
    const review: ReviewType = {
        userDisplayName: 'some display name',
        experienceDate: new Date(),
        rating: 5,
        userAvatarDescription: 'desc',
        routeLink: 'http://someroutelink.com',
        routeLinkTrusted: true,
    }

    customRender(
        <Suspense>
            <Review review={review} />
        </Suspense>,
        {
            // @ts-ignore Not testing all the states
            state: {},
            dispatch: vi.fn(),
        }
    )

    await screen.findByTestId('user-avatar')

    const userAvatarComponent = screen.getByTestId('user-avatar')
    const ratingStarsComponent = screen.getByTestId('rating-stars')
    const linkComponent = screen.getByTestId('link')

    expect(userAvatarComponent).toBeDefined()
    expect(userAvatarComponent.textContent).toBe(review.userAvatarDescription)
    expect(ratingStarsComponent).toBeDefined()
    expect(ratingStarsComponent.textContent).toBe(review.rating.toString())
    expect(screen.getByText(review.userDisplayName)).toBeDefined()
    expect(screen.getByText(review.experienceDate.toISOString())).toBeDefined()
    expect(linkComponent).toBeDefined()
    expect(linkComponent.textContent).toBe(review.routeLink)
    expect(screen.queryByTestId('icon')).toBeNull()
})

test('review with untrusted route link', async () => {
    const review: ReviewType = {
        userDisplayName: 'some display name',
        experienceDate: new Date(),
        rating: 5,
        userAvatarDescription: 'desc',
        routeLink: 'http://someroutelink.com',
        routeLinkTrusted: false,
    }

    customRender(
        <Suspense>
            <Review review={review} />
        </Suspense>,
        {
            // @ts-ignore Not testing all the states
            state: {},
            dispatch: vi.fn(),
        }
    )

    await screen.findByTestId('user-avatar')

    const userAvatarComponent = screen.getByTestId('user-avatar')
    const ratingStarsComponent = screen.getByTestId('rating-stars')
    const linkComponent = screen.getByTestId('link')
    const iconComponent = screen.getByTestId('icon')

    expect(userAvatarComponent).toBeDefined()
    expect(userAvatarComponent.textContent).toBe(review.userAvatarDescription)
    expect(ratingStarsComponent).toBeDefined()
    expect(ratingStarsComponent.textContent).toBe(review.rating.toString())
    expect(screen.getByText(review.userDisplayName)).toBeDefined()
    expect(screen.getByText(review.experienceDate.toISOString())).toBeDefined()
    expect(linkComponent).toBeDefined()
    expect(linkComponent.textContent).toBe(review.routeLink)
    expect(iconComponent).toBeDefined()
    expect(iconComponent.textContent).toBe('alert')
})
