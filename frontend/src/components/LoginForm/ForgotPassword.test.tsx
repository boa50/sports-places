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
                    title={'forgot password'}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault()
                        setScreen('forgotPassword')
                    }}
                >
                    {'forgot password'}
                </button>
            </div>
        ),
    }
})

vi.mock('./SignUp', () => {
    return {
        default: () => <div data-testid="sign-up"></div>,
    }
})

vi.mock('@/auth', () => {
    return {
        resetPassword: vi.fn(),
    }
})

vi.mock(import('../ui'), async (importOriginal) => {
    const mod = await importOriginal()

    return {
        ...mod,
        ProcessingButton: () => <div data-testid="processing-button"></div>,
    }
})

test('show default fields', async () => {
    const user = userEvent.setup()

    customRender(<LoginForm />, {
        state: { isLoginFormOpen: true },
        dispatch: vi.fn(),
    })

    await user.click(screen.getByRole('button', { name: /forgot password/i }))
    await screen.findByRole('form', { name: /forgot password/i })

    expect(
        screen.getByRole('form', { name: /forgot password/i })
    ).toBeInTheDocument()
    expect(screen.queryByTestId('sign-in')).not.toBeInTheDocument()
    expect(screen.queryByTestId('sign-up')).not.toBeInTheDocument()

    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'Reset your password'
    )

    expect(screen.getByTestId('feedback-message')).toBeInTheDocument()

    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()

    expect(
        screen.getByRole('button', { name: /reset password/i })
    ).toBeInTheDocument()
})

test('email writing', async () => {
    const user = userEvent.setup()
    const userEmail = 'testemail@mail.com'

    customRender(<LoginForm />, {
        state: { isLoginFormOpen: true },
        dispatch: vi.fn(),
    })

    await user.click(screen.getByRole('button', { name: /forgot password/i }))
    await screen.findByRole('form', { name: /forgot password/i })

    const emailInputComponent = screen.getByRole('textbox', { name: /email/i })

    expect(emailInputComponent).toBeInTheDocument()
    expect(emailInputComponent).toBeEnabled()
    await user.type(emailInputComponent, userEmail)
    expect(emailInputComponent).toHaveValue(userEmail)
})

test('processing submit', async () => {
    const { resetPassword } = await import('@/auth')
    vi.mocked(resetPassword).mockImplementationOnce(
        () =>
            new Promise(() => {
                // Simulating a slow processing function
                setTimeout(() => {}, 5000)
            })
    )

    const user = userEvent.setup()

    customRender(<LoginForm />, {
        state: { isLoginFormOpen: true },
        dispatch: vi.fn(),
    })

    await user.click(screen.getByRole('button', { name: /forgot password/i }))
    await screen.findByRole('form', { name: /forgot password/i })

    const emailInputComponent = screen.getByRole('textbox', { name: /email/i })
    const resetPasswordButtonComponent = screen.getByRole('button', {
        name: /reset password/i,
    })

    await user.type(emailInputComponent, 'testemail@mail.com')
    await user.click(resetPasswordButtonComponent)

    expect(emailInputComponent).toBeDisabled()
    expect(resetPasswordButtonComponent).not.toBeInTheDocument()
    expect(screen.getByTestId('processing-button')).toBeInTheDocument()
})

test('processing success', async () => {
    const { resetPassword } = await import('@/auth')
    vi.mocked(resetPassword).mockImplementationOnce(
        () =>
            new Promise((resolve) => {
                resolve({ type: 'success', payload: '' })
            })
    )

    const user = userEvent.setup()

    customRender(<LoginForm />, {
        state: { isLoginFormOpen: true },
        dispatch: vi.fn(),
    })

    await user.click(screen.getByRole('button', { name: /forgot password/i }))
    await screen.findByRole('form', { name: /forgot password/i })

    const emailInputComponent = screen.getByRole('textbox', { name: /email/i })

    await user.type(emailInputComponent, 'testemail@mail.com')
    await user.click(
        screen.getByRole('button', {
            name: /reset password/i,
        })
    )

    expect(emailInputComponent).toBeDisabled()
    expect(
        screen.getByRole('button', {
            name: /reset password/i,
        })
    ).toBeInTheDocument()
    expect(
        screen.getByRole('button', {
            name: /reset password/i,
        })
    ).toBeDisabled()
    expect(screen.queryByTestId('processing-button')).not.toBeInTheDocument()

    expect(screen.getByTestId('feedback-message')).not.toBeEmptyDOMElement()
})

test('processing error', async () => {
    const { resetPassword } = await import('@/auth')
    vi.mocked(resetPassword).mockImplementationOnce(
        () =>
            new Promise((resolve) => {
                resolve({ type: 'error', payload: '' })
            })
    )

    const user = userEvent.setup()

    customRender(<LoginForm />, {
        state: { isLoginFormOpen: true },
        dispatch: vi.fn(),
    })

    await user.click(screen.getByRole('button', { name: /forgot password/i }))
    await screen.findByRole('form', { name: /forgot password/i })

    const emailInputComponent = screen.getByRole('textbox', { name: /email/i })

    await user.type(emailInputComponent, 'testemail@mail.com')
    await user.click(
        screen.getByRole('button', {
            name: /reset password/i,
        })
    )

    expect(emailInputComponent).toBeEnabled()
    expect(
        screen.getByRole('button', {
            name: /reset password/i,
        })
    ).toBeInTheDocument()
    expect(
        screen.getByRole('button', {
            name: /reset password/i,
        })
    ).toBeEnabled()
    expect(screen.queryByTestId('processing-button')).not.toBeInTheDocument()

    expect(screen.getByTestId('feedback-message')).not.toBeEmptyDOMElement()
})
