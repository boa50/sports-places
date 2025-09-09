import UserPanel from './UserPanel'
import { screen, fireEvent } from '@testing-library/react'
import { customRender, mockApiCalls, testVariables } from '@/test/utils'

vi.mock('@/auth', () => ({
    getCurrentUser: () => ({
        uid: testVariables.validUserProviderId,
        email: 'test@test.com',
    }),
    signOutUser: vi.fn(),
}))

vi.mock('../UserAvatar', () => {
    return {
        default: () => <div data-testid="user-avatar"></div>,
    }
})

mockApiCalls()

test('showing user panel', async () => {
    customRender(<UserPanel />, {
        state: { isUserPanelOpen: true },
        dispatch: () => {},
    })

    await screen.findAllByRole('heading')

    expect(
        await screen.findByText(new RegExp(testVariables.validUserDisplayName))
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 6 })).toHaveTextContent(
        'test@test.com'
    )
    expect(screen.getByTestId('user-avatar')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'SignOut' })).toBeInTheDocument()
})

test('not showing user panel', async () => {
    customRender(<UserPanel />, {
        state: { isUserPanelOpen: false },
        dispatch: () => {},
    })

    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
})

test('edit button functions', async () => {
    const mockDispatch = vi.fn()

    customRender(<UserPanel />, {
        state: { isUserPanelOpen: true },
        dispatch: mockDispatch,
    })

    await screen.findByRole('button', { name: 'Edit' })

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }))

    expect(mockDispatch).toHaveBeenCalledTimes(2)
    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SHOW_USER_CUSTOMISATION_FORM',
    })
    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'HIDE_USER_PANEL',
    })
})

test('signout button functions', async () => {
    const mockSignOutUser = vi.fn()
    const { signOutUser } = await import('@/auth')
    vi.mocked(signOutUser).mockImplementationOnce(mockSignOutUser)

    const mockDispatch = vi.fn()

    customRender(<UserPanel />, {
        state: { isUserPanelOpen: true },
        dispatch: mockDispatch,
    })

    await screen.findByRole('button', { name: 'SignOut' })

    fireEvent.click(screen.getByRole('button', { name: 'SignOut' }))

    expect(mockDispatch).toHaveBeenCalledExactlyOnceWith({
        type: 'HIDE_USER_PANEL',
    })
})

test('close panel button functions', async () => {
    const mockDispatch = vi.fn()

    customRender(<UserPanel />, {
        state: { isUserPanelOpen: true },
        dispatch: mockDispatch,
    })

    await screen.findByRole('button', { name: 'Close' })

    fireEvent.click(screen.getByRole('button', { name: 'Close' }))

    expect(mockDispatch).toHaveBeenCalledExactlyOnceWith({
        type: 'HIDE_USER_PANEL',
    })
})
