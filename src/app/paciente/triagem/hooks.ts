import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { toast } from 'sonner'
import type { ZodSchema } from 'zod'

import { getProfile } from '@/actions/users'
import { ROUTES } from '@/constants/routes'
import { PATIENT_STORAGE_KEYS } from '@/constants/storage-keys'
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from '@/helpers/local-storage'
import { api } from '@/lib/api'
import { sanitizeCpf } from '@/utils/sanitize/sanitize-cpf-number'
import { sanitizePhone } from '@/utils/sanitize/sanitize-phone-number'

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
    const user = await getProfile()

    const { screening } = PATIENT_STORAGE_KEYS

    try {
      const patientInfo = getStorageItem(screening.patientData)
      const medicalReportInfo = getStorageItem(screening.medicalReport)
      const supportNetworkInfo = getStorageItem(screening.supportNetwork)

      const parsedPacientInfo =
        screeningPatientDataFormSchema.safeParse(patientInfo)
      const parsedMedicalReportInfo =
        screeningMedicalReportFormSchema.safeParse(medicalReportInfo)
      const parsedSupportNetworkInfo =
        screeningSupportNetworkContactsSchema.safeParse(supportNetworkInfo)

      if (
        !parsedPacientInfo.success ||
        !parsedMedicalReportInfo.success ||
        !parsedSupportNetworkInfo.success
      ) {
        toast.error(
          'Verifique se todos os dados estão corretos e tente novamente!',
        )
        return
      }

      const payload = {
        name: user?.name,
        gender: parsedPacientInfo.data.gender,
        date_of_birth: parsedPacientInfo.data.dateBirth,
        phone: sanitizePhone(parsedPacientInfo.data.phone),
        cpf: sanitizeCpf(parsedPacientInfo.data.cpf),
        state: parsedPacientInfo.data.state,
        city: parsedPacientInfo.data.city,
        has_disability: parsedMedicalReportInfo.data.hasDisability === 'yes',
        disability_desc:
          parsedMedicalReportInfo.data.disabilityDescription ?? '',
        need_legal_assistance:
          parsedMedicalReportInfo.data.needLegalAssistance === 'yes',
        take_medication: parsedMedicalReportInfo.data.takeMedication === 'yes',
        medication_desc:
          parsedMedicalReportInfo.data.medicationDescription ?? '',
        has_nmo_diagnosis:
          parsedMedicalReportInfo.data.hasNmoDiagnosis === 'yes',
        status: 'active',
        supports: (parsedSupportNetworkInfo.data || undefined).map(
          (support) => ({
            ...support,
            phone: sanitizePhone(support.phone),
          }),
        ),
      }

      await api('/patients/screening', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

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
    } catch (error: unknown) {
      const errorObject = error as {
        status?: number
        message?: string
        success?: boolean
      }
      switch (errorObject.status) {
        case 409:
          toast.warning(`${errorObject.message}`, { duration: 7000 })
          break
        default:
          toast.error(`${errorObject.message}`, { duration: 7000 })
      }
    }
  }

  return {
    getStoredFormData,
    saveFormAndGoToPage,
    finishScreening,
  }
}
