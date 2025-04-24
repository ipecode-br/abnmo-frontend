import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { NavButton } from '@/components/ui/nav-button'

describe('NavButton', () => {
  it('should render a default NavButton', () => {
    const buttonText = 'Home'
    render(<NavButton href='/'>{buttonText}</NavButton>)

    const fancyButtonElement = screen.getByText(buttonText)
    expect(fancyButtonElement).toBeInTheDocument()

    expect(fancyButtonElement).toHaveAttribute('href', '/')

    expect(fancyButtonElement).toHaveClass('bg-primary')
    expect(fancyButtonElement).toHaveClass('text-primary-foreground')
    expect(fancyButtonElement).toHaveClass('hover:bg-primary/80')
    expect(fancyButtonElement).toHaveClass('shadow-xs')
    expect(fancyButtonElement).toHaveClass('h-10')
    expect(fancyButtonElement).toHaveClass('px-4')
  })
  it('should render a fancy NavButton', () => {
    const buttonText = 'Fancy'
    render(
      <NavButton href='/' variant='fancy'>
        {buttonText}
      </NavButton>,
    )

    const fancyButtonElement = screen.getByText(buttonText)
    expect(fancyButtonElement).toBeInTheDocument()

    expect(fancyButtonElement).toHaveAttribute('href', '/')

    expect(fancyButtonElement).toHaveClass('bg-primary')
    expect(fancyButtonElement).toHaveClass('text-primary-foreground')
    expect(fancyButtonElement).toHaveClass('hover:bg-primary/80')
    expect(fancyButtonElement).toHaveClass('inset-shadow-md')
    expect(fancyButtonElement).toHaveClass('shadow-xs')
  })
  it('should render an outlined NavButton', () => {
    const buttonText = 'Outiline'
    render(
      <NavButton href='/' variant='outline'>
        {buttonText}
      </NavButton>,
    )

    const outlinedButtonElement = screen.getByText(buttonText)
    expect(outlinedButtonElement).toBeInTheDocument()

    expect(outlinedButtonElement).toHaveAttribute('href', '/')

    expect(outlinedButtonElement).toHaveClass('border-border')
    expect(outlinedButtonElement).toHaveClass('hover:bg-accent')
    expect(outlinedButtonElement).toHaveClass('border')
    expect(outlinedButtonElement).toHaveClass('bg-transparent')
  })
  it('should render a small NavButton', () => {
    const buttonText = 'Small'
    render(
      <NavButton href='/' size='sm'>
        {buttonText}
      </NavButton>,
    )

    const smallButtonElement = screen.getByText(buttonText)
    expect(smallButtonElement).toBeInTheDocument()

    expect(smallButtonElement).toHaveAttribute('href', '/')

    expect(smallButtonElement).toHaveClass('h-9')
    expect(smallButtonElement).toHaveClass('rounded-md')
    expect(smallButtonElement).toHaveClass('px-3')
  })
  it('should render an icon NavButton with icon size', () => {
    const buttonText = 'icon'
    render(
      <NavButton href='/' size='icon'>
        {buttonText}
      </NavButton>,
    )

    const iconButtonElement = screen.getByText(buttonText)
    expect(iconButtonElement).toBeInTheDocument()

    expect(iconButtonElement).toHaveAttribute('href', '/')

    expect(iconButtonElement).toHaveClass('size-10')
  })
  it('should render NavButton with custom class', () => {
    const buttonText = 'custom'
    render(
      <NavButton href='/' className='text-xl'>
        {buttonText}
      </NavButton>,
    )

    const customizedButtonElement = screen.getByText(buttonText)
    expect(customizedButtonElement).toBeInTheDocument()

    expect(customizedButtonElement).toHaveAttribute('href', '/')

    expect(customizedButtonElement).toHaveClass('text-xl')
  })
})
