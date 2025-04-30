import { useRouter } from 'next/navigation'

import { getStorageItem, setStorageItem } from '@/helpers/local-storage'

export const useFormNavigation = (storageKey: string) => {
  const router = useRouter()

  const getStored = getStorageItem(storageKey) ?? {}

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
