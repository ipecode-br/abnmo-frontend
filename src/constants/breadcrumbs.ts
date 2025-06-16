import { ClipboardListIcon, HomeIcon, Users } from 'lucide-react'

import { ROUTES } from '@/constants/routes'

const PATIENT_SCREENING_BREADCRUMBS = {
  paciente: {
    icon: HomeIcon,
    name: 'Início',
    path: ROUTES.patient.main,
  },
  triagem: {
    icon: ClipboardListIcon,
    name: 'Formulário de triagem',
    path: ROUTES.patient.screening.patientData,
  },
}

const DASHBOARD_BREADCRUMBS = {
  pacientes: {
    icon: Users,
    name: 'Pacientes',
    path: ROUTES.dashboard.patients,
  },
}

export const BREADCRUMBS = {
  home: {
    icon: HomeIcon,
    name: 'Início',
    path: '/',
  },
  ...PATIENT_SCREENING_BREADCRUMBS,
  ...DASHBOARD_BREADCRUMBS,
}

export type BreadcrumbsType = keyof typeof BREADCRUMBS
