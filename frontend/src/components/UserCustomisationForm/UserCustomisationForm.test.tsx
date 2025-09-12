import UserCustomisationForm from './UserCustomisationForm'
import { defaults } from '../defaults'
import { screen, act } from '@testing-library/react'
import { customRender, testVariables } from '@/test/utils'
import userEvent, { type UserEvent } from '@testing-library/user-event'

vi.mock('@/auth', () => {
    return {
        getCurrentUser: vi.fn(),
    }
})
vi.mock('../UserAvatar', () => {
    return {
        default: ({ avatarUrl }: { avatarUrl: string }) => (
            <div data-testid="user-avatar">{avatarUrl}</div>
        ),
    }
})

vi.mock(import('@tanstack/react-query'), async (importOriginal) => {
    const mod = await importOriginal()

    return {
        ...mod,
        useQueryClient: vi.fn(),
    }
})

vi.mock(import('../ui'), async (importOriginal) => {
    const mod = await importOriginal()

    return {
        ...mod,
        ProcessingButton: () => <div data-testid="processing-button"></div>,
    }
})

test('initial state new user', async () => {
    await renderComponent(false)

    expect(screen.getByTestId('user-customisation-avatars')).toBeInTheDocument()
    expect(screen.getByTestId('user-customisation-buttons')).toBeInTheDocument()

    expect(
        screen.getByRole('textbox', { name: /display name/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /display name/i })).toHaveValue()

    expect(screen.getByRole('radio', { name: 'default' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'default' })).toBeChecked()
})

test('initial state existing user', async () => {
    const { getCurrentUser } = await renderComponent(true)

    expect(screen.getByTestId('user-customisation-avatars')).toBeInTheDocument()
    expect(screen.getByTestId('user-customisation-buttons')).toBeInTheDocument()

    expect(
        screen.getByRole('textbox', { name: /display name/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /display name/i })).toHaveValue(
        testVariables.validUserDisplayName
    )

    expect(
        screen.getByRole('radio', {
            name: testVariables.avatarListFirstElementUrl,
        })
    ).toBeInTheDocument()
    expect(
        screen.getByRole('radio', {
            name: testVariables.avatarListFirstElementUrl,
        })
    ).toBeChecked()

    vi.mocked(getCurrentUser).mockReset()
})

test('change the display name', async () => {
    await renderComponent(false)

    const user = userEvent.setup()

    const displayNameInput = screen.getByRole('textbox', {
        name: /display name/i,
    })
    expect(displayNameInput).toHaveValue()

    await user.clear(displayNameInput)
    expect(displayNameInput).not.toHaveValue()

    const newDisplayName = 'New Nice Display Name'

    await user.type(displayNameInput, newDisplayName)
    expect(displayNameInput).toHaveValue(newDisplayName)
})

test('submit new user with success', async () => {
    const {
        rerenderComponent,
        mockDispatch,
        mockInvalidateQueries,
        getCurrentUser,
        useQueryClient,
    } = await renderComponentForSubmit(false)

    const user = userEvent.setup()

    await changeFormFieldsForSubmit(user, rerenderComponent, true)

    await user.click(screen.getByRole('button', { name: /save changes/i }))

    expect(mockDispatch).toHaveBeenCalledTimes(2)
    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'HIDE_USER_CUSTOMISATION_FORM',
    })
    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SHOW_ALERT_SCREEN',
        payload: {
            message: 'User preferences changed',
            type: 'success',
            timeToHide: defaults.alertScreenTimeToHide,
        },
    })
    expect(mockInvalidateQueries).toHaveBeenCalledExactlyOnceWith({
        queryKey: ['user', undefined],
    })

    submitResetMocks(getCurrentUser, useQueryClient)
})

test('submit new user with error', async () => {
    const { rerenderComponent, mockDispatch, getCurrentUser, useQueryClient } =
        await renderComponentForSubmit(false)

    const user = userEvent.setup()

    await changeFormFieldsForSubmit(user, rerenderComponent, false)

    await user.click(screen.getByRole('button', { name: /save changes/i }))

    expect(mockDispatch).toHaveBeenCalledExactlyOnceWith({
        type: 'SHOW_ALERT_SCREEN',
        payload: {
            message: 'Failed to customise user preferences, try again later',
            type: 'error',
            timeToHide: defaults.alertScreenTimeToHide,
        },
    })

    submitResetMocks(getCurrentUser, useQueryClient)
})

test('submit existing user with success', async () => {
    const {
        rerenderComponent,
        mockDispatch,
        mockInvalidateQueries,
        getCurrentUser,
        useQueryClient,
    } = await renderComponentForSubmit(true)

    const user = userEvent.setup()

    await changeFormFieldsForSubmit(user, rerenderComponent, true)

    await user.click(screen.getByRole('button', { name: /save changes/i }))

    expect(mockDispatch).toHaveBeenCalledTimes(2)
    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'HIDE_USER_CUSTOMISATION_FORM',
    })
    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SHOW_ALERT_SCREEN',
        payload: {
            message: 'User preferences changed',
            type: 'success',
            timeToHide: defaults.alertScreenTimeToHide,
        },
    })
    expect(mockInvalidateQueries).toHaveBeenCalledExactlyOnceWith({
        queryKey: ['user', testVariables.validUserProviderIdCustomAvatar],
    })

    submitResetMocks(getCurrentUser, useQueryClient)
})

test('submit existing user with error', async () => {
    const { rerenderComponent, mockDispatch, getCurrentUser, useQueryClient } =
        await renderComponentForSubmit(true)

    const user = userEvent.setup()

    await changeFormFieldsForSubmit(user, rerenderComponent, false)

    await user.click(screen.getByRole('button', { name: /save changes/i }))

    expect(mockDispatch).toHaveBeenCalledExactlyOnceWith({
        type: 'SHOW_ALERT_SCREEN',
        payload: {
            message: 'Failed to customise user preferences, try again later',
            type: 'error',
            timeToHide: defaults.alertScreenTimeToHide,
        },
    })

    submitResetMocks(getCurrentUser, useQueryClient)
})

test('handle cancel', async () => {
    const { rerenderComponent, mockDispatch, getCurrentUser } =
        await renderComponent(true)

    const user = userEvent.setup()

    await changeFormFieldsForSubmit(user, rerenderComponent, true)

    await user.click(screen.getByRole('button', { name: /cancel/i }))

    expect(mockDispatch).toHaveBeenCalledExactlyOnceWith({
        type: 'HIDE_USER_CUSTOMISATION_FORM',
    })

    expect(
        screen.getByRole('textbox', {
            name: /display name/i,
        })
    ).toHaveValue(testVariables.validUserDisplayName)
    expect(
        screen.getByRole('radio', {
            name: testVariables.avatarListSecondElementUrl,
        })
    ).not.toBeChecked()
    expect(
        screen.getByRole('radio', {
            name: testVariables.avatarListFirstElementUrl,
        })
    ).toBeChecked()

    vi.mocked(getCurrentUser).mockReset()
})

test('handle close for existing user', async () => {
    const { rerenderComponent, mockDispatch, getCurrentUser } =
        await renderComponent(true)

    const user = userEvent.setup()

    await changeFormFieldsForSubmit(user, rerenderComponent, true)

    await user.click(screen.getByTestId('close-form-modal'))

    expect(mockDispatch).toHaveBeenCalledExactlyOnceWith({
        type: 'HIDE_USER_CUSTOMISATION_FORM',
    })

    expect(
        screen.getByRole('textbox', {
            name: /display name/i,
        })
    ).toHaveValue(testVariables.validUserDisplayName)
    expect(
        screen.getByRole('radio', {
            name: testVariables.avatarListSecondElementUrl,
        })
    ).not.toBeChecked()
    expect(
        screen.getByRole('radio', {
            name: testVariables.avatarListFirstElementUrl,
        })
    ).toBeChecked()

    vi.mocked(getCurrentUser).mockReset()
})

test('handle close for new user', async () => {
    const {
        rerenderComponent,
        mockDispatch,
        mockInvalidateQueries,
        getCurrentUser,
        useQueryClient,
    } = await renderComponentForSubmit(false)

    const user = userEvent.setup()

    await changeFormFieldsForSubmit(user, rerenderComponent, true)

    await user.click(screen.getByTestId('close-form-modal'))

    expect(mockDispatch).toHaveBeenCalledTimes(3)
    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'HIDE_USER_CUSTOMISATION_FORM',
    })
    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SHOW_ALERT_SCREEN',
        payload: {
            message: 'User preferences changed',
            type: 'success',
            timeToHide: defaults.alertScreenTimeToHide,
        },
    })
    expect(mockInvalidateQueries).toHaveBeenCalledExactlyOnceWith({
        queryKey: ['user', undefined],
    })

    expect(
        screen.getByRole('textbox', {
            name: /display name/i,
        })
    ).toHaveValue('New Nice Display Name')
    expect(
        screen.getByRole('radio', {
            name: testVariables.avatarListSecondElementUrl,
        })
    ).toBeChecked()

    submitResetMocks(getCurrentUser, useQueryClient)
})

async function renderComponent(isExistingUser: boolean) {
    const { getCurrentUser } = await import('@/auth')

    if (isExistingUser) {
        // @ts-ignore Not mocking all the properties
        vi.mocked(getCurrentUser).mockImplementation(() => ({
            uid: testVariables.validUserProviderIdCustomAvatar,
        }))
    }

    const mockDispatch = vi.fn()
    const { rerender } = await act(async () =>
        customRender(<UserCustomisationForm />, {
            state: { isUserCustomisationFormOpen: true },
            dispatch: mockDispatch,
        })
    )

    const rerenderComponent = () => {
        rerender(<UserCustomisationForm />)
    }

    await screen.findByTestId('user-customisation-avatars')
    await screen.findByTestId('user-customisation-buttons')

    return {
        getCurrentUser,
        rerenderComponent,
        mockDispatch,
    }
}

async function renderComponentForSubmit(isExistingUser: boolean) {
    const mockInvalidateQueries = vi.fn()
    const { useQueryClient } = await import('@tanstack/react-query')
    // @ts-ignore Not mocking all the properties
    vi.mocked(useQueryClient).mockImplementation(() => ({
        invalidateQueries: mockInvalidateQueries,
    }))

    const ret = await renderComponent(isExistingUser)

    return { ...ret, mockInvalidateQueries, useQueryClient }
}

async function submitResetMocks(getCurrentUser: any, useQueryClient: any) {
    vi.mocked(getCurrentUser).mockReset()
    vi.mocked(useQueryClient).mockReset()
}

async function changeFormFieldsForSubmit(
    user: UserEvent,
    rerenderComponent: () => void,
    isForSuccess: boolean
) {
    const newDisplayName = isForSuccess
        ? 'New Nice Display Name'
        : testVariables.userDisplayNameChangeError

    const displayNameInput = screen.getByRole('textbox', {
        name: /display name/i,
    })

    await user.clear(displayNameInput)
    await user.type(displayNameInput, newDisplayName)

    await user.click(
        screen.getByRole('radio', {
            name: testVariables.avatarListSecondElementUrl,
        })
    )

    rerenderComponent()
}
