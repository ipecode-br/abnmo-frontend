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
import { api } from '@/lib/api'
import { GenderType, PatientType } from '@/types/patients'
import { sanitizeCpf } from '@/utils/sanitize/sanitize-cpf-number'
import { sanitizePhone } from '@/utils/sanitize/sanitize-phone-number'
import { wait } from '@/utils/wait'

import { screeningMedicalReportFormSchema } from './laudo-medico/medical-report-form-schema'
import { screeningSupportNetworkContactsSchema } from './rede-de-apoio/support-network-form-schema'
import { screeningPatientDataFormSchema } from './seus-dados/patient-data-form-schema'

type CreatePatientPayload = Omit<
  PatientType,
  'id' | 'user_id' | 'status' | 'created_at' | 'updated_at' | 'user'
> & {}

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

    const [year, month, day] = parsedPacientInfo.data.dateBirth
      .split('-')
      .map(Number)

    const patientInfoMapper = {
      name: parsedPacientInfo.data.name,
      cpf: sanitizeCpf(parsedPacientInfo.data.cpf),
      phone: sanitizePhone(parsedPacientInfo.data.phone),
      date_of_birth: new Date(year, month - 1, day),
      gender: parsedPacientInfo.data.gender as GenderType,
      state: parsedPacientInfo.data.state,
      city: parsedPacientInfo.data.city,
    }

    const medicalReportInfoMapper = {
      has_disability: parsedMedicalReportInfo.data.hasDisability === 'yes',
      disability_desc:
        parsedMedicalReportInfo.data.disabilityDescription ?? null,
      has_nmo_diagnosis: parsedMedicalReportInfo.data.hasNmoDiagnosis === 'yes',
      medication_desc:
        parsedMedicalReportInfo.data.medicationDescription ?? null,
      need_legal_assistance:
        parsedMedicalReportInfo.data.needLegalAssistance === 'yes',
      take_medication: parsedMedicalReportInfo.data.takeMedication === 'yes',
    }

    const payload: CreatePatientPayload = {
      ...patientInfoMapper,
      ...medicalReportInfoMapper,
    }

    const response = await api('/patients', {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    if (!response.success) {
      return toast.error(response.message)
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

  return { getStoredFormData, saveFormAndGoToPage, finishScreening }
}
