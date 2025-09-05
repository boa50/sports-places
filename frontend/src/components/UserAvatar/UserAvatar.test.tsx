import UserAvatar from './UserAvatar'
import { screen, act } from '@testing-library/react'
import { customRender, mockApiCalls, testVariables } from '@/test/utils'

vi.mock('@/auth', () => ({
    getCurrentUser: vi.fn(),
}))

mockApiCalls()

test('default user avatar from url parameter', async () => {
    customRender(<UserAvatar size="medium" avatarUrl="default" />)

    expect(screen.getByTestId('default-user-avatar')).toBeDefined()
})

test('default user avatar from query', async () => {
    const { getCurrentUser } = await import('@/auth')
    const getCurrentUserDefaultMock = vi
        .mocked(getCurrentUser)
        .getMockImplementation()
    // @ts-ignore Not mocking all the properties
    vi.mocked(getCurrentUser).mockImplementation(() => ({
        uid: testVariables.validUserProviderId,
    }))

    await act(async () => {
        customRender(<UserAvatar size="medium" />)
    })

    expect(screen.getByTestId('default-user-avatar')).toBeDefined()

    if (getCurrentUserDefaultMock !== undefined)
        vi.mocked(getCurrentUser).mockImplementation(getCurrentUserDefaultMock)
})

test('custom user avatar from url parameter', async () => {
    customRender(
        <UserAvatar size="medium" avatarUrl={testVariables.customAvatarUrl} />
    )

    const customAvatar = screen.getByRole('img')

    expect(customAvatar).toBeDefined()
    expect(customAvatar.getAttribute('src')).toBe(testVariables.customAvatarUrl)
})

test('custom user avatar from query', async () => {
    const { getCurrentUser } = await import('@/auth')
    const getCurrentUserDefaultMock = vi
        .mocked(getCurrentUser)
        .getMockImplementation()
    // @ts-ignore Not mocking all the properties
    vi.mocked(getCurrentUser).mockImplementation(() => ({
        uid: testVariables.validUserProviderIdCustomAvatar,
    }))

    await act(async () => {
        customRender(<UserAvatar size="medium" />)
    })

    const customAvatar = screen.getByRole('img')

    expect(customAvatar).toBeDefined()
    expect(customAvatar.getAttribute('src')).toBe(testVariables.customAvatarUrl)

    if (getCurrentUserDefaultMock !== undefined)
        vi.mocked(getCurrentUser).mockImplementation(getCurrentUserDefaultMock)
})
