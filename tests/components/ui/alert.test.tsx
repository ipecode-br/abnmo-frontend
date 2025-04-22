import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { Alert } from '@/components/ui/alert'

describe('Alert', () => {
  it('should render a default Alert', () => {
    const alertMessage = 'Message'
    render(<Alert>{alertMessage}</Alert>)

    const alertElement = screen.getByText(alertMessage)

    expect(alertElement).toHaveClass('border-disabled/50')
    expect(alertElement).toHaveClass('bg-disabled/5')
    expect(alertElement).toHaveClass('text-foreground')
  })
  it('should render an error Alert', () => {
    const alertMessage = 'Error message'
    render(<Alert variant='error'>{alertMessage}</Alert>)

    const alertElement = screen.getByText(alertMessage)

    expect(alertElement).toHaveClass('border-error')
    expect(alertElement).toHaveClass('text-error')
    expect(alertElement).toHaveClass('bg-error/5')
  })
  it('should render a success Alert', () => {
    const alertMessage = 'Success message'
    render(<Alert variant='success'>{alertMessage}</Alert>)

    const alertElement = screen.getByText(alertMessage)

    expect(alertElement).toHaveClass('border-success')
    expect(alertElement).toHaveClass('text-success')
    expect(alertElement).toHaveClass('bg-success/5')
  })
  it('should render with error classes when "error" prop is true', () => {
    const alertMessage = 'Another error message'
    render(<Alert error>{alertMessage}</Alert>)

    const alertElement = screen.getByText(alertMessage)

    expect(alertElement).toHaveClass('border-error')
    expect(alertElement).toHaveClass('text-error')
    expect(alertElement).toHaveClass('bg-error/5')
  })
  it('should render Alert with custom class', () => {
    const customClassMessage = 'Custom class message'
    render(<Alert className='text-2xl'>{customClassMessage}</Alert>)

    const alertElement = screen.getByText(customClassMessage)

    expect(alertElement).toHaveClass('text-2xl')
  })
})
