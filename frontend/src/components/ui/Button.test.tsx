import { Button } from './Button'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('./Icon', () => {
    return {
        Icon: ({ type }: { type: string }) => (
            <div data-testid="mocked-icon">{type}</div>
        ),
    }
})

test('render default button', () => {
    const buttonTitle = 'press me'
    render(<Button title={buttonTitle} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeEnabled()
    expect(screen.getByRole('button')).toHaveClass('bg-sky-600')
    expect(screen.getByRole('button')).not.toHaveAttribute('type', 'submit')
    expect(screen.getByRole('button')).toHaveTextContent(buttonTitle)
})

test('render secondary button', () => {
    const buttonTitle = 'press me'
    render(<Button title={buttonTitle} isSecondary={true} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeEnabled()
    expect(screen.getByRole('button')).toHaveClass(
        'bg-transparent border-sky-700'
    )
    expect(screen.getByRole('button')).not.toHaveAttribute('type', 'submit')
    expect(screen.getByRole('button')).toHaveTextContent(buttonTitle)
})

test('render default button disabled', () => {
    const buttonTitle = 'press me'
    render(<Button title={buttonTitle} isDisabled={true} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByRole('button')).toHaveClass('disabled:bg-gray-400')
    expect(screen.getByRole('button')).toHaveTextContent(buttonTitle)
})

test('render secondary button disabled', () => {
    const buttonTitle = 'press me'
    render(<Button title={buttonTitle} isSecondary={true} isDisabled={true} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByRole('button')).toHaveClass(
        'disabled:bg-gray-200 disabled:border-gray-300'
    )
    expect(screen.getByRole('button')).toHaveTextContent(buttonTitle)
})

test('render submit button', () => {
    const buttonTitle = 'press me'
    render(<Button title={buttonTitle} isSubmit={true} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeEnabled()
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
    expect(screen.getByRole('button')).toHaveTextContent(buttonTitle)
})

test('render button with different width', () => {
    const buttonTitle = 'press me'
    render(<Button title={buttonTitle} width="w-500" />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeEnabled()
    expect(screen.getByRole('button')).toHaveClass('w-500')
    expect(screen.getByRole('button')).toHaveTextContent(buttonTitle)
})

test('render button with icon', () => {
    const buttonTitle = 'press me'
    render(<Button title={buttonTitle} icon="alert" />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeEnabled()
    expect(screen.getByRole('button')).toHaveTextContent(buttonTitle)
    expect(screen.getByTestId('mocked-icon')).toBeInTheDocument()
    expect(screen.getByTestId('mocked-icon')).toHaveTextContent('alert')
})

test('validate button click', async () => {
    const mockClick = vi.fn()
    const buttonTitle = 'press me'
    render(<Button title={buttonTitle} onClick={mockClick} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeEnabled()
    expect(screen.getByRole('button')).toHaveTextContent(buttonTitle)

    const user = userEvent.setup()

    await user.click(screen.getByRole('button'))

    expect(mockClick).toHaveBeenCalledOnce()
})

test('validate disabled button click', async () => {
    const mockClick = vi.fn()
    const buttonTitle = 'press me'
    render(<Button title={buttonTitle} onClick={mockClick} isDisabled={true} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByRole('button')).toHaveTextContent(buttonTitle)

    const user = userEvent.setup()

    await user.click(screen.getByRole('button'))

    expect(mockClick).not.toHaveBeenCalled()
})
