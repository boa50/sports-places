import Buttons from './Buttons'
import { screen } from '@testing-library/react'
import { customRender } from '@/test/utils'
import userEvent from '@testing-library/user-event'

vi.mock(import('../ui'), async (importOriginal) => {
    const mod = await importOriginal()

    return {
        ...mod,
        ProcessingButton: () => <div data-testid="processing-button"></div>,
    }
})

test('initial state, new user', async () => {
    customRender(
        <Buttons
            isProcessing={false}
            handleCancel={vi.fn()}
            isNewUser={true}
        />,
        {
            state: {},
            dispatch: vi.fn(),
        }
    )

    expect(
        screen.getByRole('button', { name: /save changes/i })
    ).toBeInTheDocument()
    expect(
        screen.getByRole('button', { name: /save changes/i })
    ).toHaveAttribute('type', 'submit')
    expect(
        screen.queryByRole('button', { name: /cancel/i })
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId('processing-button')).not.toBeInTheDocument()
})

test('initial state, existing user', async () => {
    customRender(
        <Buttons
            isProcessing={false}
            handleCancel={vi.fn()}
            isNewUser={false}
        />,
        {
            state: {},
            dispatch: vi.fn(),
        }
    )

    expect(
        screen.getByRole('button', { name: /save changes/i })
    ).toBeInTheDocument()
    expect(
        screen.getByRole('button', { name: /save changes/i })
    ).toHaveAttribute('type', 'submit')
    expect(
        screen.queryByRole('button', { name: /cancel/i })
    ).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /cancel/i })).toBeEnabled()
    expect(screen.queryByTestId('processing-button')).not.toBeInTheDocument()
})

test('processing state, new user', async () => {
    customRender(
        <Buttons isProcessing={true} handleCancel={vi.fn()} isNewUser={true} />,
        {
            state: {},
            dispatch: vi.fn(),
        }
    )

    expect(
        screen.queryByRole('button', { name: /save changes/i })
    ).not.toBeInTheDocument()
    expect(
        screen.queryByRole('button', { name: /cancel/i })
    ).not.toBeInTheDocument()
    expect(screen.getByTestId('processing-button')).toBeInTheDocument()
})

test('processing state, existing user', async () => {
    customRender(
        <Buttons
            isProcessing={true}
            handleCancel={vi.fn()}
            isNewUser={false}
        />,
        {
            state: {},
            dispatch: vi.fn(),
        }
    )

    expect(
        screen.queryByRole('button', { name: /save changes/i })
    ).not.toBeInTheDocument()
    expect(
        screen.queryByRole('button', { name: /cancel/i })
    ).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /cancel/i })).toBeDisabled()
    expect(screen.getByTestId('processing-button')).toBeInTheDocument()
})

test('cancel button', async () => {
    const mockHandleCancel = vi.fn()
    customRender(
        <Buttons
            isProcessing={false}
            handleCancel={mockHandleCancel}
            isNewUser={false}
        />,
        {
            state: {},
            dispatch: vi.fn(),
        }
    )

    const user = userEvent.setup()

    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /cancel/i }))

    expect(mockHandleCancel).toHaveBeenCalledOnce()
})
