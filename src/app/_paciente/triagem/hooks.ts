import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { toast } from 'sonner'
import type { ZodSchema } from 'zod'

import { ROUTES } from '@/constants/routes'
import { PATIENT_STORAGE_KEYS } from '@/constants/storage-keys'
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from '@/helpers/local-storage'
import { api } from '@/lib/api'
import { removeNonNumbers } from '@/utils/sanitizers'

import { screeningMedicalReportFormSchema } from './laudo-medico/medical-report-form-schema'
import { screeningSupportNetworkContactsSchema } from './rede-de-apoio/support-network-form-schema'
import { screeningPatientDataFormSchema } from './seus-dados/patient-data-form-schema'

interface UseScreeningProps {
  storageKey: string
}

interface SaveFormAndGoToPageProps<Schema> {
  data: Schema
  path: string
}

export function useScreening({ storageKey }: Readonly<UseScreeningProps>) {
  const router = useRouter()

  const getStoredFormData = useCallback(
    <T>(schema: ZodSchema<T>) => {
      const storedData = getStorageItem(storageKey)
      const parsedValue = schema.safeParse(storedData)

      return parsedValue.success ? parsedValue.data : null
    },
    [storageKey],
  )

  function saveFormAndGoToPage<T>({ data, path }: SaveFormAndGoToPageProps<T>) {
    setStorageItem(storageKey, data)
    router.push(path)
  }

  async function finishScreening() {
    const { screening } = PATIENT_STORAGE_KEYS

    const patientInfo = getStorageItem(screening.patientData)
    const medicalReportInfo = getStorageItem(screening.medicalReport)
    const supportNetworkInfo = getStorageItem(screening.supportNetwork)

    const patient = screeningPatientDataFormSchema.safeParse(patientInfo)
    const medicalReport =
      screeningMedicalReportFormSchema.safeParse(medicalReportInfo)
    const supportNetwork =
      screeningSupportNetworkContactsSchema.safeParse(supportNetworkInfo)

    if (!patient.success || !medicalReport.success || !supportNetwork.success) {
      toast.error(
        'Verifique se todos os dados estão corretos e tente novamente!',
      )
      return
    }

    const supports =
      supportNetwork.data && supportNetwork.data.length > 0
        ? supportNetwork.data.map((contact) => ({
            ...contact,
            phone: removeNonNumbers(contact.phone),
          }))
        : undefined

    const payload = {
      ...patient.data,
      phone: removeNonNumbers(patient.data.phone),
      cpf: removeNonNumbers(patient.data.cpf),
      has_disability: medicalReport.data.has_disability === 'yes',
      disability_desc: medicalReport.data.disability_desc ?? null,
      need_legal_assistance: medicalReport.data.need_legal_assistance === 'yes',
      take_medication: medicalReport.data.take_medication === 'yes',
      medication_desc: medicalReport.data.medication_desc ?? null,
      has_nmo_diagnosis: medicalReport.data.has_nmo_diagnosis === 'yes',
      supports,
    }

    const response = await api('/patients/screening', {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    if (!response.success) {
      toast.error(response.message)
      return
    }

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

  return {
    getStoredFormData,
    saveFormAndGoToPage,
    finishScreening,
  }
}
