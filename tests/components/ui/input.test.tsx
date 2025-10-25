import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { Atom } from 'lucide-react'

import { Input } from '@/components/ui/input'

describe('Input', () => {
  it('should render a default Input', () => {
    render(<Input />)

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveClass(
      'h-10 w-full rounded-lg border px-3 text-sm shadow-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50 border-border text-foreground',
    )
  })
  it('should render an error Input', () => {
    render(<Input variant='error' />)

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveClass('border-error focus-visible:ring-error')
  })
  it('should render a default Input with icon', () => {
    render(<Input icon={Atom} />)

    const inputElement = screen.getByRole('textbox')
    const iconElement = screen.getByTestId('input-icon')

    expect(inputElement).toBeInTheDocument()
    expect(iconElement).toBeInTheDocument()

    expect(iconElement).toHaveClass('text-disabled')
    expect(iconElement).toHaveClass(
      'absolute left-3 shrink-0 transition-colors',
    )
  })
  it('should render an error Input with icon', () => {
    render(<Input icon={Atom} variant='error' />)

    const inputElement = screen.getByRole('textbox')
    const iconElement = screen.getByTestId('input-icon')

    expect(inputElement).toBeInTheDocument()
    expect(iconElement).toBeInTheDocument()

    expect(iconElement).toHaveClass('text-error')
    expect(iconElement).toHaveClass(
      'absolute left-3 shrink-0 transition-colors',
    )
  })
})
