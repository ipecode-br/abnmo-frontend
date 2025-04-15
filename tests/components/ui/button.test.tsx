import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('should render a default button', () => {
    const buttonText = 'Default Button'
    render(<Button>{buttonText}</Button>)

    const buttonElement = screen.getByRole('button', { name: buttonText })

    expect(buttonElement).toHaveClass('bg-primary')
    expect(buttonElement).toHaveClass('text-primary-foreground')
    expect(buttonElement).toHaveClass('h-10')
    expect(buttonElement).toHaveClass('px-4')
  })
})
