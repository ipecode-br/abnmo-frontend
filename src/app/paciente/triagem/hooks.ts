import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import type { ZodSchema } from 'zod'

import { ROUTES } from '@/constants/routes'
import { PATIENT_STORAGE_KEYS } from '@/constants/storage-keys'
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from '@/helpers/local-storage'
import { wait } from '@/utils/wait'

interface UseScreeningProps {
  storageKey: string
}

interface SaveFormAndGoToPageProps<Schema> {
  data: Schema
  path: string
}

export function useScreening({ storageKey }: Readonly<UseScreeningProps>) {
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
    const { screening } = PATIENT_STORAGE_KEYS
    await wait(1000)
    console.log(screening.patientData)

    toast.success(
      'Obrigado por enviar suas informações. Estamos analisando seu cadastro e entraremos em contato em breve.',
      { duration: 7000 },
    )

    removeStorageItem([
      screening.patientData,
      screening.medicalReport,
      screening.supportNetwork,
    ])

    router.replace(ROUTES.patient.main)
  }

  return { getStoredFormData, saveFormAndGoToPage, finishScreening }
}
