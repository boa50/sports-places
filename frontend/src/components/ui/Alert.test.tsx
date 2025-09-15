import { Alert } from './Alert'
import { screen, render } from '@testing-library/react'

test('show success alert', () => {
    const message = 'some success message'
    render(<Alert message={message} type="success" />)

    expect(screen.getByRole('alert')).toHaveClass('text-sky-700 bg-sky-50/90')
    expect(screen.getByRole('alert')).toHaveTextContent(message)
})

test('show error alert', () => {
    const message = 'a different error alert'
    render(<Alert message={message} type="error" />)

    expect(screen.getByRole('alert')).toHaveClass('text-red-700 bg-red-50/90')
    expect(screen.getByRole('alert')).toHaveTextContent(message)
})

test('show info alert', () => {
    const message = 'just a simple info'
    render(<Alert message={message} type="info" />)

    expect(screen.getByRole('alert')).toHaveClass('text-gray-700 bg-gray-50/90')
    expect(screen.getByRole('alert')).toHaveTextContent(message)
})
