import UserManagementButton from './UserManagementButton'
import { screen, fireEvent } from '@testing-library/react'
import { customRender, mockApiCalls } from '@/test/utils'

vi.mock('./CustomControl', () => {
    return {
        default: ({ children }: { children: React.ReactNode }) => (
            <div data-testid="custom-control">{children}</div>
        ),
    }
})

vi.mock('@/auth', () => ({
    getCurrentUser: vi.fn(),
}))

mockApiCalls()

test('show no button', async () => {
    customRender(<UserManagementButton />, {
        // @ts-ignore Not testing all the states
        state: { isUserSignedIn: undefined },
        dispatch: () => {},
    })

    await screen.findByTestId('custom-control')

    expect(screen.getByTestId('custom-control')).toBeDefined()
    expect(screen.queryByRole('button', { name: 'Sign in' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'User' })).toBeNull()
})

test('show signed out button', async () => {
    const mockDispatch = vi.fn()

    customRender(<UserManagementButton />, {
        // @ts-ignore Not testing all the states
        state: { isUserSignedIn: false },
        dispatch: mockDispatch,
    })

    await screen.findByRole('button', { name: 'Sign in' })

    const signInBtn = screen.getByRole('button', { name: 'Sign in' })

    expect(screen.getByTestId('custom-control')).toBeDefined()
    expect(signInBtn).toBeDefined()
    expect(screen.queryByRole('button', { name: 'User' })).toBeNull()

    fireEvent.click(signInBtn)

    expect(mockDispatch).toHaveBeenCalledExactlyOnceWith({
        type: 'SHOW_LOGIN_FORM',
    })
})

test('show signed in button', async () => {
    const mockDispatch = vi.fn()

    customRender(<UserManagementButton />, {
        // @ts-ignore Not testing all the states
        state: { isUserSignedIn: true },
        dispatch: mockDispatch,
    })

    await screen.findByRole('button', { name: 'User' })

    const userBtn = screen.getByRole('button', { name: 'User' })

    expect(screen.getByTestId('custom-control')).toBeDefined()
    expect(screen.queryByRole('button', { name: 'Sign in' })).toBeNull()
    expect(userBtn).toBeDefined()

    fireEvent.click(userBtn)

    expect(mockDispatch).toHaveBeenCalledExactlyOnceWith({
        type: 'SHOW_USER_PANEL',
    })
})
