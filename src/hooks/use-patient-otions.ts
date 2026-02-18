'use client'

import { useQuery } from '@tanstack/react-query'

import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { api } from '@/lib/api'
import type { Patient } from '@/types/patients.d.ts'
import { formatCpfNumber } from '@/utils/formatters/format-cpf-number'

export function usePatientOptions() {
  const { data: response } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.patients.allOptions],
    queryFn: () => api<{ patients: Patient[] }>('/patients/options'),
  })

  const patientOptions =
    response?.data?.patients.map((patient) => ({
      value: patient.id,
      label: patient.name,
      description: `CPF: ${formatCpfNumber(patient.cpf)}`,
    })) || []

  return { patientOptions }
}
