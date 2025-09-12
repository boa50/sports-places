import Avatars from './Avatars'
import { screen, act } from '@testing-library/react'
import { customRender, testVariables } from '@/test/utils'
import userEvent from '@testing-library/user-event'

vi.mock('../UserAvatar', () => {
    return {
        default: ({ avatarUrl }: { avatarUrl: string }) => (
            <div data-testid="user-avatar">{avatarUrl}</div>
        ),
    }
})

test('initial state, default avatar', async () => {
    const selectedAvatar = 'default'
    await act(async () => {
        customRender(
            <Avatars selectedAvatar={selectedAvatar} handleChange={vi.fn()} />,
            {
                state: {},
                dispatch: vi.fn(),
            }
        )
    })

    await screen.findByRole('list')
    await screen.findAllByRole('radio')

    expect(screen.getAllByRole('radio')).not.toHaveLength(0)

    expect(
        screen.getByRole('radio', { name: selectedAvatar })
    ).toBeInTheDocument()

    screen.getAllByRole('radio').forEach((item) => {
        if (item.id.includes(selectedAvatar)) expect(item).toBeChecked()
        else expect(item).not.toBeChecked()
    })
})

test('initial state, selected avatar', async () => {
    const selectedAvatar = testVariables.avatarListFirstElementDescription
    await act(async () => {
        customRender(
            <Avatars selectedAvatar={selectedAvatar} handleChange={vi.fn()} />,
            {
                state: {},
                dispatch: vi.fn(),
            }
        )
    })

    await screen.findByRole('list')
    await screen.findAllByRole('radio')

    expect(screen.getAllByRole('radio')).not.toHaveLength(0)

    expect(
        screen.getByRole('radio', {
            name: testVariables.avatarListFirstElementUrl,
        })
    ).toBeInTheDocument()

    screen.getAllByRole('radio').forEach((item) => {
        if (item.id.includes(selectedAvatar)) expect(item).toBeChecked()
        else expect(item).not.toBeChecked()
    })
})

test('changing selected avatar', async () => {
    let selectedAvatar = 'default'
    const mockHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        selectedAvatar = e.target.value
    }

    const { rerender } = await act(async () =>
        customRender(
            <Avatars
                selectedAvatar={selectedAvatar}
                handleChange={mockHandleChange}
            />,
            {
                state: {},
                dispatch: vi.fn(),
            }
        )
    )

    const user = userEvent.setup()

    await screen.findByRole('list')
    await screen.findAllByRole('radio')

    expect(
        screen.getByRole('radio', {
            name: selectedAvatar,
        })
    ).toBeInTheDocument()
    expect(
        screen.getByRole('radio', {
            name: selectedAvatar,
        })
    ).toBeChecked()

    await user.click(
        screen.getByRole('radio', {
            name: testVariables.avatarListFirstElementUrl,
        })
    )

    expect(selectedAvatar).toBe(testVariables.avatarListFirstElementDescription)

    rerender(
        <Avatars
            selectedAvatar={selectedAvatar}
            handleChange={mockHandleChange}
        />
    )

    screen.getAllByRole('radio').forEach((item) => {
        if (item.id.includes(selectedAvatar)) expect(item).toBeChecked()
        else expect(item).not.toBeChecked()
    })
})
