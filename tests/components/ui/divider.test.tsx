import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { Divider } from '@/components/ui/divider'

describe('Divider', () => {
  it('should render a default Divider', () => {
    render(<Divider />)

    const dividerElement = screen.getByTestId('separator')
    expect(dividerElement).toBeInTheDocument()
    expect(dividerElement).toHaveClass('bg-border h-px')
  })
  it('should render a Divider with text', () => {
    render(<Divider text='ou' />)

    const text = screen.getByText('ou')
    expect(text).toBeInTheDocument()
    expect(text).toHaveClass(
      'bg-background text-foreground-soft z-10 px-3 text-sm',
    )

    const line = screen.getByTestId('separator')
    expect(line).toBeInTheDocument()
    expect(line).toHaveClass('bg-border absolute h-px w-full')
  })
  it('should render a vertical Divider', () => {
    render(<Divider orientation='vertical' height='h-4' />)

    const dividerElement = screen.getByTestId('separator')
    expect(dividerElement).toBeInTheDocument()
    expect(dividerElement).toHaveClass('bg-border w-px h-4')
  })
  it('should render a vertical Divider in container with flex class', () => {
    render(<Divider orientation='vertical' height='h-4' flexItem />)

    const dividerElement = screen.getByTestId('separator')
    expect(dividerElement).toBeInTheDocument()
    expect(dividerElement).toHaveClass('bg-border w-px h-4 self-stretch')
  })
})
