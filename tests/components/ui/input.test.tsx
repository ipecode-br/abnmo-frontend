import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { Input } from '@/components/ui-v2/input'

describe('Input', () => {
  it('should render a default Input', () => {
    render(<Input />)

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveClass(
      'w-full rounded-lg border px-3 shadow-xs transition-colors disabled:pointer-events-none disabled:opacity-50 border-border text-foreground',
    )
  })
  it('should render an error Input', () => {
    render(<Input variant='error' />)

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveClass('border-error outline-error')
  })
})
