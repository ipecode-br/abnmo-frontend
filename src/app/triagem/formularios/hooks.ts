import { useRouter } from 'next/navigation'
import type { ZodSchema } from 'zod'

import { getStorageItem, setStorageItem } from '@/helpers/local-storage'

interface SaveFormAndGoToPageProps<Schema> {
  data: Schema
  path: string
}

export function useScreeningFormNavigation(storageKey: string) {
  const router = useRouter()

  function getStoredFormData<T>(schema: ZodSchema<T>) {
    const storedData = getStorageItem(storageKey)
    const parsedValue = schema.safeParse(storedData)

    return parsedValue.success ? parsedValue.data : null
  }

  function saveFormAndGoToPage<T>({ data, path }: SaveFormAndGoToPageProps<T>) {
    setStorageItem(storageKey, data)
    router.push(path)
  }

  return { getStoredFormData, saveFormAndGoToPage }
}
