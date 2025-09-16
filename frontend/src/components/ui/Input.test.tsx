import { Input } from './Input'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('./Icon', () => {
    return {
        Icon: ({ type }: { type: string }) => (
            <div data-testid="mocked-icon">{type}</div>
        ),
    }
})

test('render a default text input', () => {
    const inputId = 'some-nice-id'
    const inputLabel = 'Beautiful Label'
    const inputValue = 'some text'
    render(
        <Input
            id={inputId}
            type="text"
            label={inputLabel}
            value={inputValue}
            onChange={vi.fn()}
        />
    )

    const inputComponent = screen.getByRole('textbox', { name: inputLabel })

    expect(inputComponent).toBeInTheDocument()
    expect(inputComponent).toBeEnabled()
    expect(inputComponent).toHaveAttribute('type', 'text')
    expect(inputComponent).toHaveAttribute('id', inputId)
    expect(inputComponent).toHaveAttribute('name', inputId)
    expect(inputComponent).toHaveValue(inputValue)

    expect(
        screen.queryByRole('button', {
            name: /toggle password visibility/i,
        })
    ).toBeNull()
})

test('render a default email input', () => {
    const inputId = 'some-nice-id'
    const inputLabel = 'Beautiful Label'
    const inputValue = 'test@mail.com'
    render(
        <Input
            id={inputId}
            type="email"
            label={inputLabel}
            value={inputValue}
            onChange={vi.fn()}
        />
    )

    const inputComponent = screen.getByRole('textbox', { name: inputLabel })

    expect(inputComponent).toBeInTheDocument()
    expect(inputComponent).toBeEnabled()
    expect(inputComponent).toHaveAttribute('type', 'email')
    expect(inputComponent).toHaveAttribute('id', inputId)
    expect(inputComponent).toHaveAttribute('name', inputId)
    expect(inputComponent).toHaveValue(inputValue)

    expect(
        screen.queryByRole('button', {
            name: /toggle password visibility/i,
        })
    ).toBeNull()
})

test('render a default url input', () => {
    const inputId = 'some-nice-id'
    const inputLabel = 'Beautiful Label'
    const inputValue = 'http://www.test-url.com'
    render(
        <Input
            id={inputId}
            type="url"
            label={inputLabel}
            value={inputValue}
            onChange={vi.fn()}
        />
    )

    const inputComponent = screen.getByRole('textbox', { name: inputLabel })

    expect(inputComponent).toBeInTheDocument()
    expect(inputComponent).toBeEnabled()
    expect(inputComponent).toHaveAttribute('type', 'url')
    expect(inputComponent).toHaveAttribute('id', inputId)
    expect(inputComponent).toHaveAttribute('name', inputId)
    expect(inputComponent).toHaveValue(inputValue)

    expect(
        screen.queryByRole('button', {
            name: /toggle password visibility/i,
        })
    ).toBeNull()
})

test('render a default date input', () => {
    const inputId = 'some-nice-id'
    const inputLabel = 'Beautiful Label'
    const inputValue = '2020-01-15'
    render(
        <Input
            id={inputId}
            type="date"
            label={inputLabel}
            value={inputValue}
            onChange={vi.fn()}
        />
    )

    const inputComponent = screen.getByLabelText(inputLabel)

    expect(inputComponent).toBeInTheDocument()
    expect(inputComponent).toBeEnabled()
    expect(inputComponent).toHaveAttribute('type', 'date')
    expect(inputComponent).toHaveAttribute('id', inputId)
    expect(inputComponent).toHaveAttribute('name', inputId)
    expect(inputComponent).toHaveValue(inputValue)

    expect(
        screen.queryByRole('button', {
            name: /toggle password visibility/i,
        })
    ).toBeNull()
})

test('render a default password input', () => {
    const inputId = 'some-nice-id'
    const inputLabel = 'Beautiful Label'
    const inputValue = 'mySecretPassword'
    render(
        <Input
            id={inputId}
            type="password"
            label={inputLabel}
            value={inputValue}
            onChange={vi.fn()}
        />
    )

    const inputComponent = screen.getByLabelText(inputLabel)

    expect(inputComponent).toBeInTheDocument()
    expect(inputComponent).toBeEnabled()
    expect(inputComponent).toHaveAttribute('type', 'password')
    expect(inputComponent).toHaveAttribute('id', inputId)
    expect(inputComponent).toHaveAttribute('name', inputId)
    expect(inputComponent).toHaveValue(inputValue)

    expect(
        screen.getByRole('button', {
            name: /toggle password visibility/i,
        })
    ).toBeInTheDocument()
})

test('change the value of the input', async () => {
    const inputId = 'some-nice-id'
    const inputLabel = 'Beautiful Label'
    const inputValue = 'some text'
    const mockOnChange = vi.fn()
    render(
        <Input
            id={inputId}
            type="text"
            label={inputLabel}
            value={inputValue}
            onChange={mockOnChange}
        />
    )

    const inputComponent = screen.getByRole('textbox', { name: inputLabel })

    expect(inputComponent).toHaveAttribute('type', 'text')
    expect(inputComponent).toHaveValue(inputValue)

    const user = userEvent.setup()

    await user.clear(inputComponent)
    await user.type(inputComponent, 'some new input value')

    expect(mockOnChange).toHaveBeenCalled()
})

test('render with a custom hint', () => {
    const inputId = 'some-nice-id'
    const inputLabel = 'Beautiful Label'
    const inputValue = 'some text'
    const inputHint = 'a random hint showing how to fill the field'
    render(
        <Input
            id={inputId}
            type="text"
            label={inputLabel}
            value={inputValue}
            hint={inputHint}
            onChange={vi.fn()}
        />
    )

    const inputComponent = screen.getByRole('textbox', { name: inputLabel })

    expect(inputComponent).toHaveAttribute('title', inputHint)
})

test('render with a custom placeholder', () => {
    const inputId = 'some-nice-id'
    const inputLabel = 'Beautiful Label'
    const inputValue = 'some text'
    const inputPlaceholder = 'fill like this'
    render(
        <Input
            id={inputId}
            type="text"
            label={inputLabel}
            value={inputValue}
            placeholder={inputPlaceholder}
            onChange={vi.fn()}
        />
    )

    const inputComponent = screen.getByRole('textbox', { name: inputLabel })

    expect(inputComponent).toHaveAttribute('placeholder', inputPlaceholder)
})

test('render with a full width', () => {
    const inputId = 'some-nice-id'
    const inputLabel = 'Beautiful Label'
    const inputValue = 'some text'
    const { rerender } = render(
        <Input
            id={inputId}
            type="text"
            label={inputLabel}
            value={inputValue}
            onChange={vi.fn()}
            isFullWidth={false}
        />
    )

    const inputComponent = screen.getByRole('textbox', { name: inputLabel })

    expect(inputComponent).not.toHaveClass('w-full')

    rerender(
        <Input
            id={inputId}
            type="text"
            label={inputLabel}
            value={inputValue}
            onChange={vi.fn()}
            isFullWidth={true}
        />
    )

    expect(inputComponent).toHaveClass('w-full')
})

test('input with a max value', () => {
    const inputId = 'some-nice-id'
    const inputLabel = 'Beautiful Label'
    const inputValue = '2020-01-01'
    render(
        <Input
            id={inputId}
            type="date"
            label={inputLabel}
            value={inputValue}
            onChange={vi.fn()}
            maxValue={'2020-01-02'}
        />
    )

    expect(screen.getByLabelText(inputLabel)).toHaveAttribute(
        'max',
        '2020-01-02'
    )
})

test('input with a max length', () => {
    const inputId = 'some-nice-id'
    const inputLabel = 'Beautiful Label'
    const inputValue = 'some nice input value'
    render(
        <Input
            id={inputId}
            type="text"
            label={inputLabel}
            value={inputValue}
            onChange={vi.fn()}
            maxLength={10}
        />
    )

    expect(screen.getByLabelText(inputLabel)).toHaveAttribute('maxLength', '10')
})

test('render a disabled input', () => {
    const inputId = 'some-nice-id'
    const inputLabel = 'Beautiful Label'
    const inputValue = 'some text'
    render(
        <Input
            id={inputId}
            type="text"
            label={inputLabel}
            value={inputValue}
            onChange={vi.fn()}
            isDisabled={true}
        />
    )

    const inputComponent = screen.getByRole('textbox', { name: inputLabel })

    expect(inputComponent).toBeDisabled()
})

test('changing value on a disabled input', async () => {
    const inputId = 'some-nice-id'
    const inputLabel = 'Beautiful Label'
    const inputValue = 'some text'
    const mockOnChange = vi.fn()
    render(
        <Input
            id={inputId}
            type="text"
            label={inputLabel}
            value={inputValue}
            onChange={mockOnChange}
            isDisabled={true}
        />
    )

    const inputComponent = screen.getByRole('textbox', { name: inputLabel })

    const user = userEvent.setup()
    await user.type(inputComponent, 'some new input value')

    expect(mockOnChange).not.toHaveBeenCalled()
})

test('render a input with custom invalidity', async () => {
    const inputId = 'some-nice-id'
    const inputLabel = 'Beautiful Label'
    const inputValue = 'some text'
    render(
        <Input
            id={inputId}
            type="text"
            label={inputLabel}
            value={inputValue}
            onChange={vi.fn()}
            isCustomIvalidity={true}
        />
    )

    const inputComponent = screen.getByRole('textbox', { name: inputLabel })

    expect(inputComponent).toHaveAttribute('aria-invalid', 'true')
    expect(inputComponent).toHaveClass('border-red-700')
})

test('change password input visibility', async () => {
    const inputId = 'some-nice-id'
    const inputLabel = 'Beautiful Label'
    const inputValue = 'mySecretPassword'
    render(
        <Input
            id={inputId}
            type="password"
            label={inputLabel}
            value={inputValue}
            onChange={vi.fn()}
        />
    )

    const inputComponent = screen.getByLabelText(inputLabel)
    const buttonComponent = screen.getByRole('button', {
        name: /toggle password visibility/i,
    })
    const iconComponent = screen.getByTestId('mocked-icon')

    expect(inputComponent).toHaveAttribute('type', 'password')

    expect(buttonComponent).toBeInTheDocument()
    expect(iconComponent).toBeInTheDocument()
    expect(iconComponent).toHaveTextContent('eyeClosed')

    const user = userEvent.setup()
    await user.click(buttonComponent)

    expect(inputComponent).toHaveAttribute('type', 'text')
    expect(iconComponent).toHaveTextContent('eyeOpened')

    await user.click(buttonComponent)

    expect(inputComponent).toHaveAttribute('type', 'password')
    expect(iconComponent).toHaveTextContent('eyeClosed')
})
