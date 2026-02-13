import { UserPlus2Icon } from 'lucide-react'
import type { Metadata } from 'next'

import { SectionHeader, SectionHeaderTitle } from '@/components/section-header'
import { PatientForm } from '@/modules/patients/form'

export const metadata: Metadata = {
  title: 'Cadastrar paciente',
}

export default function Page() {
  return (
    <>
      <SectionHeader>
        <SectionHeaderTitle
          title='Cadastrar paciente'
          icon={<UserPlus2Icon />}
        />
      </SectionHeader>

      <PatientForm mode='create' />
    </>
  )
}
