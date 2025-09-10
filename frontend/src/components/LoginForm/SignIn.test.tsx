import LoginForm from './LoginForm'
import { screen } from '@testing-library/react'
import { customRender } from '@/test/utils'
import userEvent from '@testing-library/user-event'

vi.mock('./ForgotPassword', () => {
    return {
        default: () => <div data-testid="forgot-password"></div>,
    }
})

vi.mock('./SignUp', () => {
    return {
        default: () => <div data-testid="sign-up"></div>,
    }
})

vi.mock('@/auth', () => {
    return {
        signInWithEmail: vi.fn(),
    }
})

vi.mock(import('../ui'), async (importOriginal) => {
    const mod = await importOriginal()

    return {
        ...mod,
        ProcessingButton: () => <div data-testid="processing-button"></div>,
    }
})

beforeEach(async ({ task }) => {
    if (task.name.includes('SKIP BEFORE_EACH SETUP')) return

    customRender(<LoginForm />, {
        state: { isLoginFormOpen: true },
        dispatch: vi.fn(),
    })

    await screen.findByRole('form', { name: /sign in/i })
})

test('show default fields', async () => {
    expect(screen.getByRole('form', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.queryByTestId('forgot-password')).not.toBeInTheDocument()
    expect(screen.queryByTestId('sign-up')).not.toBeInTheDocument()

    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'Sign in to your account'
    )

    expect(screen.getByTestId('feedback-message')).toBeInTheDocument()

    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()

    expect(
        screen.getByRole('button', { name: /forgot password/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
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

    const passwordInputComponent = screen.getByLabelText(/password/i)

    expect(passwordInputComponent).toBeInTheDocument()
    expect(passwordInputComponent).toBeEnabled()
    await user.type(passwordInputComponent, userPassword)
    expect(passwordInputComponent).toHaveValue(userPassword)
})

test('processing submit', async () => {
    const { signInWithEmail } = await import('@/auth')
    vi.mocked(signInWithEmail).mockImplementationOnce(
        () =>
            new Promise(() => {
                // Simulating a slow processing function
                setTimeout(() => {}, 5000)
            })
    )

    const user = userEvent.setup()

    const emailInputComponent = screen.getByRole('textbox', { name: /email/i })
    const passwordInputComponent = screen.getByLabelText(/password/i)
    const signInButtonComponent = screen.getByRole('button', {
        name: /sign in/i,
    })

    await user.type(emailInputComponent, 'testemail@mail.com')
    await user.type(passwordInputComponent, 'someNicePassw0rd')
    await user.click(signInButtonComponent)

    expect(emailInputComponent).toBeDisabled()
    expect(passwordInputComponent).toBeDisabled()
    expect(signInButtonComponent).not.toBeInTheDocument()
    expect(screen.getByTestId('processing-button')).toBeInTheDocument()
})

test('processing submit success SKIP BEFORE_EACH SETUP', async () => {
    const { signInWithEmail } = await import('@/auth')
    vi.mocked(signInWithEmail).mockImplementationOnce(
        () =>
            new Promise((resolve) => {
                resolve({ type: 'success', payload: '' })
            })
    )

    const user = userEvent.setup()
    const mockDispatch = vi.fn()

    customRender(<LoginForm />, {
        state: { isLoginFormOpen: true },
        dispatch: mockDispatch,
    })

    await screen.findByRole('form', { name: /sign in/i })

    const emailInputComponent = screen.getByRole('textbox', { name: /email/i })
    const passwordInputComponent = screen.getByLabelText(/password/i)
    const signInButtonComponent = screen.getByRole('button', {
        name: /sign in/i,
    })

    await user.type(emailInputComponent, 'testemail@mail.com')
    await user.type(passwordInputComponent, 'someNicePassw0rd')
    await user.click(signInButtonComponent)

    expect(mockDispatch).toHaveBeenCalledExactlyOnceWith({
        type: 'HIDE_LOGIN_FORM',
    })
    expect(emailInputComponent).toHaveValue('')
    expect(passwordInputComponent).toHaveValue('')

    expect(screen.getByTestId('feedback-message')).toHaveTextContent('')
})

test('processing submit error', async () => {
    const { signInWithEmail } = await import('@/auth')
    vi.mocked(signInWithEmail).mockImplementationOnce(
        () =>
            new Promise((resolve) => {
                resolve({ type: 'error', payload: '' })
            })
    )

    const user = userEvent.setup()
    const userEmail = 'testemail@mail.com'
    const userPassword = 'someNicePassw0rd'

    const emailInputComponent = screen.getByRole('textbox', { name: /email/i })
    const passwordInputComponent = screen.getByLabelText(/password/i)

    await user.type(emailInputComponent, userEmail)
    await user.type(passwordInputComponent, userPassword)
    await user.click(
        screen.getByRole('button', {
            name: /sign in/i,
        })
    )

    expect(emailInputComponent).toHaveValue(userEmail)
    expect(passwordInputComponent).toHaveValue(userPassword)

    expect(emailInputComponent).toBeEnabled()
    expect(passwordInputComponent).toBeEnabled()
    expect(
        screen.getByRole('button', {
            name: /sign in/i,
        })
    ).toBeInTheDocument()
    expect(screen.queryByTestId('processing-button')).not.toBeInTheDocument()

    expect(screen.getByTestId('feedback-message')).not.toBeEmptyDOMElement()
})

test('change to forgot password', async () => {
    const user = userEvent.setup()

    expect(screen.getByRole('form', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.queryByTestId('forgot-password')).not.toBeInTheDocument()
    expect(screen.queryByTestId('sign-up')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /forgot password/i }))

    expect(screen.getByTestId('forgot-password')).toBeInTheDocument()
    expect(
        screen.queryByRole('form', { name: /sign in/i })
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId('sign-up')).not.toBeInTheDocument()
})

test('change to sign up', async () => {
    const user = userEvent.setup()

    expect(screen.getByRole('form', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.queryByTestId('forgot-password')).not.toBeInTheDocument()
    expect(screen.queryByTestId('sign-up')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /sign up/i }))

    expect(screen.getByTestId('sign-up')).toBeInTheDocument()
    expect(
        screen.queryByRole('form', { name: /sign in/i })
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId('forgot-password')).not.toBeInTheDocument()
})
