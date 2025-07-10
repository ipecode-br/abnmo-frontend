import { ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

interface ReactPortalProps {
  containerId: string
  children: ReactNode
}

export function ReactPortal({ containerId, children }: ReactPortalProps) {
  const [mounted, setMounted] = useState(false)
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    let element = document.getElementById(containerId)

    if (!element) {
      element = document.createElement('div')
      element.setAttribute('id', containerId)
      document.body.appendChild(element)
    }

    setContainer(element)
    setMounted(true)
  }, [containerId])

  if (!mounted || !container) return null

  return ReactDOM.createPortal(children, container)
}
