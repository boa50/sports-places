import { RatingStars, RatingStarsInteractive } from './RatingStars'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('./Icon', () => {
    return {
        Icon: ({
            type,
            filled,
        }: {
            type: string
            filled: 'full' | 'half' | 'none'
        }) => (
            <div data-testid="mocked-icon" data-value={type}>
                {filled}
            </div>
        ),
    }
})

test('render the rating stars without any icon filled', () => {
    const rating = 0
    render(<RatingStars rating={rating} />)

    const starsIcons = screen.getAllByTestId('mocked-icon')
    expect(starsIcons).toHaveLength(5)

    starsIcons.forEach((startIcon) => {
        expect(startIcon).toHaveAttribute('data-value', 'star')
    })

    starsIcons.forEach((startIcon) => {
        expect(startIcon).toHaveTextContent('none')
    })
})

test('render the rating stars with all icons filled', () => {
    const rating = 5
    render(<RatingStars rating={rating} />)

    const starsIcons = screen.getAllByTestId('mocked-icon')
    expect(starsIcons).toHaveLength(5)

    starsIcons.forEach((startIcon) => {
        expect(startIcon).toHaveAttribute('data-value', 'star')
    })

    starsIcons.forEach((startIcon) => {
        expect(startIcon).toHaveTextContent('full')
    })
})

test('render the rating stars with a score of 3.5', () => {
    const rating = 3.5
    render(<RatingStars rating={rating} />)

    const starsIcons = screen.getAllByTestId('mocked-icon')

    for (let i = 0; i <= 2; i++) expect(starsIcons[i]).toHaveTextContent('full')
    expect(starsIcons[3]).toHaveTextContent('half')
    expect(starsIcons[4]).toHaveTextContent('none')
})

test('render the rating stars with a score of 1.75', () => {
    const rating = 1.75
    render(<RatingStars rating={rating} />)

    const starsIcons = screen.getAllByTestId('mocked-icon')

    for (let i = 0; i <= 1; i++) expect(starsIcons[i]).toHaveTextContent('full')
    for (let i = 2; i <= 4; i++) expect(starsIcons[i]).toHaveTextContent('none')
})

test('render the rating stars with a score of 1.25', () => {
    const rating = 1.25
    render(<RatingStars rating={rating} />)

    const starsIcons = screen.getAllByTestId('mocked-icon')

    expect(starsIcons[0]).toHaveTextContent('full')
    expect(starsIcons[1]).toHaveTextContent('half')
    for (let i = 2; i <= 4; i++) expect(starsIcons[i]).toHaveTextContent('none')
})

test('render the rating stars interactive without any icon filled', () => {
    let rating = 0
    const mockHandleChange = vi.fn((e: React.ChangeEvent<HTMLInputElement>) => {
        rating = parseInt(e.target.value)
    })
    render(
        <RatingStarsInteractive
            rating={rating}
            handleChange={mockHandleChange}
        />
    )

    const starsIcons = screen.getAllByTestId('mocked-icon')
    expect(starsIcons).toHaveLength(5)

    starsIcons.forEach((startIcon) => {
        expect(startIcon).toHaveAttribute('data-value', 'star')
    })

    starsIcons.forEach((startIcon) => {
        expect(startIcon).toHaveTextContent('none')
    })
})

test('render the rating stars interactive changes', async () => {
    let rating = 0
    const mockHandleChange = vi.fn((e: React.ChangeEvent<HTMLInputElement>) => {
        rating = parseInt(e.target.value)
    })
    const { rerender } = render(
        <RatingStarsInteractive
            rating={rating}
            handleChange={mockHandleChange}
        />
    )

    const user = userEvent.setup()
    const starsIcons = screen.getAllByTestId('mocked-icon')

    for (let idx = 0; idx < starsIcons.length; idx++) {
        await user.click(starsIcons[idx])
        expect(mockHandleChange).toHaveBeenCalledOnce()
        mockHandleChange.mockClear()

        rerender(
            <RatingStarsInteractive
                rating={rating}
                handleChange={mockHandleChange}
            />
        )

        for (let i = 0; i <= idx; i++)
            expect(starsIcons[i]).toHaveTextContent('full')
        for (let i = idx + 1; i <= 4; i++)
            expect(starsIcons[i]).toHaveTextContent('none')
    }
})
