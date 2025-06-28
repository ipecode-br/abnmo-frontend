import { useEffect, useState } from 'react'

export function useDebounce<Data>(value: Data, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState<Data>(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
