import UserPanel from './UserPanel'
import { screen } from '@testing-library/react'
import { customRender, mockApiCalls, testVariables } from '@/test/utils'

vi.mock('@/api/utils', () => {
    return {
        getApiUrl: () => 'http://apiMock.com',
    }
})

mockApiCalls()

test('showing user panel', async () => {
    vi.mock('@/auth', async () => {
        return {
            getCurrentUser: () => {
                return {
                    uid: testVariables.validUserProviderId,
                    email: 'test@test.com',
                }
            },
        }
    })

    vi.mock('./UserAvatar', () => {
        return {
            default: () => <div data-testid="user-avatar"></div>,
        }
    })

    customRender(<UserPanel />, {
        // @ts-ignore Not testing all the states
        state: { isUserPanelOpen: true },
        dispatch: () => {},
    })

    await screen.findAllByRole('heading')

    expect(
        await screen.findByText(new RegExp(testVariables.validUserDisplayName))
    ).toBeDefined()
    expect(screen.getByRole('heading', { level: 6 }).textContent).toEqual(
        'test@test.com'
    )
    expect(screen.getByTestId('user-avatar')).toBeDefined()
    expect(screen.getByRole('button', { name: 'Close' })).toBeDefined()
    expect(screen.getByRole('button', { name: 'Edit' })).toBeDefined()
    expect(screen.getByRole('button', { name: 'SignOut' })).toBeDefined()
})
