'use client'

import { usePathname } from 'next/navigation'

import { TabButtons } from '@/components/ui/tab-buttons'
import { ROUTES } from '@/constants/routes'

export default function PatientDocumentsTab() {
  const pathname = usePathname()

  const hideTabButtons = pathname.startsWith('/paciente/triagem')

  if (hideTabButtons) return null

  return <TabButtons buttons={BUTTONS} />
}

const BUTTONS = [
  {
    title: 'Pendentes',
    path: ROUTES.patient.documents.pending,
  },
  {
    title: 'Enviados',
    path: ROUTES.patient.documents.sent,
  },
]
