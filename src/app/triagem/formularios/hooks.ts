import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import type { ZodSchema } from 'zod'

import { getStorageItem, setStorageItem } from '@/helpers/local-storage'
import { wait } from '@/utils/wait'

interface UseScreeningFormNavigationProps {
  storageKey: string
}

interface SaveFormAndGoToPageProps<Schema> {
  data: Schema
  path: string
}

export function useScreeningFormNavigation({
  storageKey,
}: Readonly<UseScreeningFormNavigationProps>) {
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

  async function finishScreening() {
    await wait(1000)

    toast.success(
      'Obrigado por enviar suas informações. Estamos analisando seu cadastro e entraremos em contato em breve.',
      { duration: 7000 },
    )
  }

  return { getStoredFormData, saveFormAndGoToPage, finishScreening }
}
