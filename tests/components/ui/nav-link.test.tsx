import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { NavLink } from '@/components/ui/nav-link'
import { getRoutes } from '@/constants/routes'

describe('NavLink', () => {
  it('should render a default NavLink', () => {
    const routes = getRoutes()

    const LinkText = 'Triagem'
    const href = routes.patient.main
    render(<NavLink href={href}>{LinkText}</NavLink>)

    const navLinkElement = screen.getByText(LinkText)
    expect(navLinkElement).toBeInTheDocument()

    expect(navLinkElement).toHaveAttribute('href', href)

    // Cobrindo apenas comportamento essencial (aparência visual esperada)
    expect(navLinkElement).toHaveClass('hover:text-primary')
    expect(navLinkElement).toHaveClass('underline')
    expect(navLinkElement).toHaveClass('transition-colors')
  })
})
