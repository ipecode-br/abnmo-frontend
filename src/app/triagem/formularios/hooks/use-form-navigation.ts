import { useRouter } from 'next/navigation'
import { ZodSchema } from 'zod'

import { getStorageItem, setStorageItem } from '@/helpers/local-storage'

export const useFormNavigation = (storageKey: string) => {
  const router = useRouter()

  const getStored = <T>(schema: ZodSchema<T>) => {
    const storedData = getStorageItem(storageKey)
    const parsedValue = schema.safeParse(storedData)

    return parsedValue.success ? parsedValue.data : {}
  }

  const goPage = ({
    data,
    path,
  }: {
    data: Record<string, string>
    path: string
  }) => {
    setStorageItem(storageKey, data)
    router.push(path)
  }

  return { getStored, goPage }
}
