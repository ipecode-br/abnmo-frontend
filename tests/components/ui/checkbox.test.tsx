import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { Checkbox } from '@/components/ui/checkbox'

describe('Checkbox', () => {
  it('should render a default Checkbox', () => {
    render(<Checkbox />)

    const checkboxElement = screen.getByRole('checkbox')

    expect(checkboxElement).toHaveClass('size-4.5')
  })
  it('should render a medium Checkbox', () => {
    render(<Checkbox size='md' />)

    const checkboxElement = screen.getByRole('checkbox')

    expect(checkboxElement).toHaveClass('size-5')
  })
  it('should render a disabled Checkbox', () => {
    render(<Checkbox disabled />)

    const checkboxElement = screen.getByRole('checkbox')

    expect(checkboxElement).toBeDisabled()
  })
  it('should render a checked Checkbox', () => {
    render(<Checkbox checked onCheckedChange={() => {}} />)

    const checkboxElement = screen.getByRole('checkbox')

    expect(checkboxElement).toBeChecked()
  })
})
