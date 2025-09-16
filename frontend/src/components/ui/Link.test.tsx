import { Link } from './Link'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('render default link', () => {
    const linkTitle = 'The Title'
    const linkUrl = 'http://link-url-test.com'
    render(<Link title={linkTitle} url={linkUrl} />)

    const linkComponent = screen.getByRole('link', { name: linkTitle })

    expect(linkComponent).toBeInTheDocument()
    expect(linkComponent).toHaveAttribute('href', linkUrl)
    expect(linkComponent).toHaveAttribute('target', '_top')

    expect(screen.queryByRole('button', { name: linkTitle })).toBeNull()
})

test('render link with opening on a new tab', () => {
    const linkTitle = 'The Title'
    const linkUrl = 'http://link-url-test.com'
    render(<Link title={linkTitle} url={linkUrl} isOpenNewTab={true} />)

    const linkComponent = screen.getByRole('link', { name: linkTitle })

    expect(linkComponent).toBeInTheDocument()
    expect(linkComponent).toHaveAttribute('href', linkUrl)
    expect(linkComponent).toHaveAttribute('target', '_blank')

    expect(screen.queryByRole('button', { name: linkTitle })).toBeNull()
})

test('render button link', async () => {
    const linkTitle = 'The Title'
    const mockOnClick = vi.fn()
    render(<Link title={linkTitle} onClick={mockOnClick} />)

    const linkComponent = screen.getByRole('button', { name: linkTitle })

    expect(linkComponent).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: linkTitle })).toBeNull()

    const user = userEvent.setup()
    await user.click(linkComponent)

    expect(mockOnClick).toHaveBeenCalledOnce()
})
