import LoginForm from './LoginForm'
import { screen } from '@testing-library/react'
import { customRender } from '@/test/utils'
import userEvent from '@testing-library/user-event'

vi.mock('./SignIn', () => {
    return {
        default: ({
            setScreen,
        }: {
            setScreen: React.Dispatch<
                React.SetStateAction<'signIn' | 'signUp' | 'forgotPassword'>
            >
        }) => (
            <div data-testid="sign-in">
                <button
                    title={'sign up'}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault()
                        setScreen('signUp')
                    }}
                >
                    {'sign up'}
                </button>
            </div>
        ),
    }
})

vi.mock('./ForgotPassword', () => {
    return {
        default: () => <div data-testid="forgot-password"></div>,
    }
})

vi.mock('@/auth', () => {
    return {
        createUserWithEmail: vi.fn(),
    }
})

vi.mock(import('../ui'), async (importOriginal) => {
    const mod = await importOriginal()

    return {
        ...mod,
        ProcessingButton: () => <div data-testid="processing-button"></div>,
    }
})

beforeEach(async () => {
    const user = userEvent.setup()

    customRender(<LoginForm />, {
        state: { isLoginFormOpen: true },
        dispatch: vi.fn(),
    })

    await user.click(screen.getByRole('button', { name: /sign up/i }))
    await screen.findByRole('form', { name: /sign up/i })
})

test('show default fields', async () => {
    expect(screen.getByRole('form', { name: /sign up/i })).toBeInTheDocument()
    expect(screen.queryByTestId('forgot-password')).not.toBeInTheDocument()
    expect(screen.queryByTestId('sign-in')).not.toBeInTheDocument()

    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'Create a new account'
    )

    expect(screen.getByTestId('feedback-message')).toBeInTheDocument()

    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Repeat your password')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
})

test('email writing', async () => {
    const user = userEvent.setup()
    const userEmail = 'testemail@mail.com'

    const emailInputComponent = screen.getByRole('textbox', { name: /email/i })

    expect(emailInputComponent).toBeInTheDocument()
    expect(emailInputComponent).toBeEnabled()
    await user.type(emailInputComponent, userEmail)
    expect(emailInputComponent).toHaveValue(userEmail)
})

test('password writing', async () => {
    const user = userEvent.setup()
    const userPassword = 'someNicePassw0rd'

    const passwordInputComponent = screen.getByLabelText('Password')

    expect(passwordInputComponent).toBeInTheDocument()
    expect(passwordInputComponent).toBeEnabled()
    await user.type(passwordInputComponent, userPassword)
    expect(passwordInputComponent).toHaveValue(userPassword)
})

test('password confirmation writing', async () => {
    const user = userEvent.setup()
    const userPassword = 'someNicePassw0rd'

    const passwordConfirmationInputComponent = screen.getByLabelText(
        'Repeat your password'
    )

    expect(passwordConfirmationInputComponent).toBeInTheDocument()
    expect(passwordConfirmationInputComponent).toBeEnabled()
    await user.type(passwordConfirmationInputComponent, userPassword)
    expect(passwordConfirmationInputComponent).toHaveValue(userPassword)
})

test('processing submit with password different from password confirmation', async () => {
    const user = userEvent.setup()

    const emailInputComponent = screen.getByRole('textbox', { name: /email/i })
    const passwordInputComponent = screen.getByLabelText('Password')
    const passwordConfirmationInputComponent = screen.getByLabelText(
        'Repeat your password'
    )
    const signUpButtonComponent = screen.getByRole('button', {
        name: /sign up/i,
    })

    await user.type(emailInputComponent, 'testemail@mail.com')
    await user.type(passwordInputComponent, 'someNicePassw0rd')
    await user.type(
        passwordConfirmationInputComponent,
        'someNicePassw0rdWithChanges'
    )
    await user.click(signUpButtonComponent)

    expect(emailInputComponent).toBeEnabled()
    expect(passwordInputComponent).toBeEnabled()
    expect(passwordConfirmationInputComponent).toBeEnabled()
    expect(signUpButtonComponent).toBeInTheDocument()
    expect(screen.queryByTestId('processing-button')).not.toBeInTheDocument()

    expect(screen.getByTestId('feedback-message')).not.toBeEmptyDOMElement()
})

test('processing submit', async () => {
    const { createUserWithEmail } = await import('@/auth')
    vi.mocked(createUserWithEmail).mockImplementationOnce(
        () =>
            new Promise(() => {
                // Simulating a slow processing function
                setTimeout(() => {}, 5000)
            })
    )

    const user = userEvent.setup()
    const userPassword = 'someNicePassw0rd'

    const emailInputComponent = screen.getByRole('textbox', { name: /email/i })
    const passwordInputComponent = screen.getByLabelText('Password')
    const passwordConfirmationInputComponent = screen.getByLabelText(
        'Repeat your password'
    )
    const signUpButtonComponent = screen.getByRole('button', {
        name: /sign up/i,
    })

    await user.type(emailInputComponent, 'testemail@mail.com')
    await user.type(passwordInputComponent, userPassword)
    await user.type(passwordConfirmationInputComponent, userPassword)
    await user.click(signUpButtonComponent)

    expect(emailInputComponent).toBeDisabled()
    expect(passwordInputComponent).toBeDisabled()
    expect(passwordConfirmationInputComponent).toBeDisabled()
    expect(signUpButtonComponent).not.toBeInTheDocument()
    expect(screen.getByTestId('processing-button')).toBeInTheDocument()
})

test('processing submit success', async () => {
    const { createUserWithEmail } = await import('@/auth')
    vi.mocked(createUserWithEmail).mockImplementationOnce(
        () =>
            new Promise((resolve) => {
                resolve({ type: 'success', payload: '' })
            })
    )

    const user = userEvent.setup()
    const userPassword = 'someNicePassw0rd'

    const emailInputComponent = screen.getByRole('textbox', { name: /email/i })
    const passwordInputComponent = screen.getByLabelText('Password')
    const passwordConfirmationInputComponent = screen.getByLabelText(
        'Repeat your password'
    )

    await user.type(emailInputComponent, 'testemail@mail.com')
    await user.type(passwordInputComponent, userPassword)
    await user.type(passwordConfirmationInputComponent, userPassword)
    await user.click(
        screen.getByRole('button', {
            name: /sign up/i,
        })
    )

    expect(emailInputComponent).toBeDisabled()
    expect(passwordInputComponent).toBeDisabled()
    expect(passwordConfirmationInputComponent).toBeDisabled()
    expect(
        screen.getByRole('button', {
            name: /sign up/i,
        })
    ).toBeInTheDocument()
    expect(
        screen.getByRole('button', {
            name: /sign up/i,
        })
    ).toBeDisabled()
    expect(screen.queryByTestId('processing-button')).not.toBeInTheDocument()

    expect(screen.getByTestId('feedback-message')).not.toBeEmptyDOMElement()
})

test('processing submit error', async () => {
    const { createUserWithEmail } = await import('@/auth')
    vi.mocked(createUserWithEmail).mockImplementationOnce(
        () =>
            new Promise((resolve) => {
                resolve({ type: 'error', payload: '' })
            })
    )

    const user = userEvent.setup()
    const userPassword = 'someNicePassw0rd'

    const emailInputComponent = screen.getByRole('textbox', { name: /email/i })
    const passwordInputComponent = screen.getByLabelText('Password')
    const passwordConfirmationInputComponent = screen.getByLabelText(
        'Repeat your password'
    )

    await user.type(emailInputComponent, 'testemail@mail.com')
    await user.type(passwordInputComponent, userPassword)
    await user.type(passwordConfirmationInputComponent, userPassword)
    await user.click(
        screen.getByRole('button', {
            name: /sign up/i,
        })
    )

    expect(emailInputComponent).toBeEnabled()
    expect(passwordInputComponent).toBeEnabled()
    expect(passwordConfirmationInputComponent).toBeEnabled()
    expect(
        screen.getByRole('button', {
            name: /sign up/i,
        })
    ).toBeInTheDocument()
    expect(
        screen.getByRole('button', {
            name: /sign up/i,
        })
    ).toBeEnabled()
    expect(screen.queryByTestId('processing-button')).not.toBeInTheDocument()

    expect(screen.getByTestId('feedback-message')).not.toBeEmptyDOMElement()
})
