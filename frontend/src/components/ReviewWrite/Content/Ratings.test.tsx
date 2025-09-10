import ReviewWrite from '../ReviewWrite'
import { screen } from '@testing-library/react'
import { customRender } from '@/test/utils'
import userEvent from '@testing-library/user-event'

vi.mock('@/auth', () => {
    return {
        getCurrentUser: vi.fn(),
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

beforeEach(() => {
    customRender(<ReviewWrite isShow={true} hideWriteReview={vi.fn()} />, {
        state: {},
        dispatch: vi.fn(),
    })
})

test('check initial state', async () => {
    const interactiveComponent = screen.getByTestId('rating-stars-interactive')

    expect(interactiveComponent).toBeInTheDocument()
    expect(interactiveComponent).toHaveValue('0')
})

test('change rating change value', async () => {
    const user = userEvent.setup()

    const interactiveComponent = screen.getByTestId('rating-stars-interactive')

    await user.type(interactiveComponent, '5')
    expect(interactiveComponent).toHaveValue('5')
})
