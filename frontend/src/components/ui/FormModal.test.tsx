import { FormModal } from './FormModal'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('render standard form modal', () => {
    const formTitle = 'some title'
    const formChildren = () => <div data-testid="form-modal-children"></div>

    render(
        <FormModal title={formTitle} isModalOpen={true} closeModal={vi.fn()}>
            {formChildren()}
        </FormModal>
    )

    expect(screen.getByText(formTitle)).toBeInTheDocument()
    expect(screen.getByTestId('form-modal-children')).toBeInTheDocument()
    expect(screen.getByTestId('close-form-modal')).toBeInTheDocument()
})

test('render not opened form modal', () => {
    const formTitle = 'some title'
    const formChildren = () => <div data-testid="form-modal-children"></div>

    render(
        <FormModal title={formTitle} isModalOpen={false} closeModal={vi.fn()}>
            {formChildren()}
        </FormModal>
    )

    expect(screen.queryByText(formTitle)).toBeNull()
    expect(screen.queryByTestId('form-modal-children')).toBeNull()
    expect(screen.queryByTestId('close-form-modal')).toBeNull()
})

test('onClick function', async () => {
    const mockCloseModal = vi.fn()
    const formTitle = 'some title'
    const formChildren = () => <div data-testid="form-modal-children"></div>

    render(
        <FormModal
            title={formTitle}
            isModalOpen={true}
            closeModal={mockCloseModal}
        >
            {formChildren()}
        </FormModal>
    )

    expect(screen.getByText(formTitle)).toBeInTheDocument()
    expect(screen.getByTestId('form-modal-children')).toBeInTheDocument()
    expect(screen.getByTestId('close-form-modal')).toBeInTheDocument()

    const user = userEvent.setup()

    await user.click(screen.getByTestId('close-form-modal'))

    expect(mockCloseModal).toHaveBeenCalledOnce()
})
