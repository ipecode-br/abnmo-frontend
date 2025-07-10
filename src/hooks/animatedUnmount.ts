import { useEffect, useRef, useState } from 'react'

export function useAnimatedUnmount(visible = false) {
  const [shouldRender, setShouldRender] = useState(visible)
  const animatedElementRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (visible) {
      setShouldRender(true)
      requestAnimationFrame(() => {
        setIsAnimating(true)
      })
    } else {
      setIsAnimating(false)
    }

    function handleAnimationEnd() {
      setShouldRender(false)
    }

    const elementRef = animatedElementRef.current
    if (!visible && elementRef) {
      elementRef.addEventListener('transitionend', handleAnimationEnd)
    }

    return () => {
      if (elementRef) {
        elementRef.removeEventListener('transitionend', handleAnimationEnd)
      }
    }
  }, [visible])

  return {
    shouldRender,
    animatedElementRef,
    isAnimating,
  }
}
