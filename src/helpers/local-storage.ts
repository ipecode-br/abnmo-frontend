export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return

  localStorage.setItem(key, JSON.stringify(value))
}

export function getStorageItem<T>(key: string): T | null {
  if (typeof window === 'undefined') return null

  try {
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : null
  } catch (error) {
    console.error('Error parsing localStorage item', error)
    return null
  }
}

export function removeStorageItem(key: string | string[]): void {
  if (typeof window === 'undefined') return

  if (Array.isArray(key)) {
    for (const item of key) {
      localStorage.removeItem(item)
    }
    return
  }

  localStorage.removeItem(key)
}
