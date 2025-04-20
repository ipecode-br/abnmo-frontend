import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { Label } from '@/components/ui/label'

describe('Label', () => {
  it('should render a default Label', () => {
    const text = 'Label name'

    render(<Label htmlFor='name'>{text}</Label>)

    const labelElement = screen.getByText(text)

    expect(labelElement).toBeInTheDocument()
    expect(labelElement).toHaveClass('text-sm')
    expect(labelElement).toHaveClass('font-medium')
    expect(labelElement).toHaveAttribute('for', 'name')
  })

  it('should render Label with custom class', () => {
    render(
      <Label htmlFor='another-name' className='text-blue-500 italic'>
        Label text
      </Label>,
    )

    const labelElement = screen.getByText('Label text')

    expect(labelElement).toHaveClass('text-blue-500')
    expect(labelElement).toHaveClass('italic')
  })
})
