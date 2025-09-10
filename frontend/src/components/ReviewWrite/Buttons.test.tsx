import Buttons from './Buttons'
import { screen } from '@testing-library/react'
import { customRender } from '@/test/utils'
import userEvent from '@testing-library/user-event'

test('initial state display', async () => {
    customRender(<Buttons handleCancel={vi.fn()} isPostDisabled={false} />, {
        state: {},
        dispatch: vi.fn(),
    })

    const cancelButton = screen.getByRole('button', {
        name: /cancel/i,
    })
    const postButton = screen.getByRole('button', {
        name: /post/i,
    })

    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).toBeEnabled()
    expect(postButton).toBeInTheDocument()
    expect(postButton).toBeEnabled()
    expect(postButton).toHaveAttribute('type', 'submit')
})

test('cancel button action', async () => {
    const user = userEvent.setup()

    const mockHandleCancel = vi.fn()
    customRender(
        <Buttons handleCancel={mockHandleCancel} isPostDisabled={false} />,
        {
            state: {},
            dispatch: vi.fn(),
        }
    )

    await user.click(
        screen.getByRole('button', {
            name: /cancel/i,
        })
    )

    expect(mockHandleCancel).toHaveBeenCalledOnce()
})

test('post button disabled', async () => {
    customRender(<Buttons handleCancel={vi.fn()} isPostDisabled={true} />, {
        state: {},
        dispatch: vi.fn(),
    })

    const cancelButton = screen.getByRole('button', {
        name: /cancel/i,
    })
    const postButton = screen.getByRole('button', {
        name: /post/i,
    })

    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).toBeEnabled()
    expect(postButton).toBeInTheDocument()
    expect(postButton).toBeDisabled()
    expect(postButton).toHaveAttribute('type', 'submit')
})
