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

  it('should render a outline button', () => {
    const buttonText = 'Outline Button'
    render(<Button variant='outline'>{buttonText}</Button>)

    const buttonElement = screen.getByRole('button', { name: buttonText })

    expect(buttonElement).toHaveClass('bg-background')
    expect(buttonElement).toHaveClass('text-accent-foreground')
    expect(buttonElement).toHaveClass('border')
    expect(buttonElement).toHaveClass('border-border')
  })

  it('should render a small button', () => {
    const buttonText = 'Small Button'
    render(<Button size='sm'>{buttonText}</Button>)

    const buttonElement = screen.getByRole('button', { name: buttonText })

    expect(buttonElement).toHaveClass('h-9')
    expect(buttonElement).toHaveClass('rounded-lg')
    expect(buttonElement).toHaveClass('px-4')
  })
})
