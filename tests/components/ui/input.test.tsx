import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { Input } from '@/components/ui/input'

describe('Input', () => {
  it('should render a default Input', () => {
    render(<Input />)

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveClass(
      'peer text-foreground bg-background placeholder:text-disabled w-full rounded-lg border px-3 text-base read-only:outline-none focus:outline-2 focus:-outline-offset-1 disabled:opacity-50',
    )
    expect(inputElement).toHaveClass(
      'border-border focus:outline-ring hover:border-ring',
    )
    expect(inputElement).toHaveClass('h-10')
  })
  it('should render an error Input', () => {
    render(<Input variant='error' />)

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveClass('border-error focus:outline-error')
  })
})
