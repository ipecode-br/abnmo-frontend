import {
  ClipboardListIcon,
  History,
  HomeIcon,
  type LucideIcon,
  User2,
  Users2,
} from 'lucide-react'

import { ROUTES } from './routes'

type BreadcrumbDataType = {
  icon: LucideIcon
  name: string
  path: string
}

type Breadcrumbs = Record<string, BreadcrumbDataType>

const PATIENT_SCREENING_BREADCRUMBS: Breadcrumbs = {
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

const DASHBOARD_BREADCRUMBS: Breadcrumbs = {
  pacientes: {
    icon: Users2,
    name: 'Pacientes',
    path: ROUTES.dashboard.patients.main,
  },
  informacoes: {
    icon: User2,
    name: 'Informações do paciente',
    path: ROUTES.dashboard.patients.main,
  },
  historico: {
    icon: History,
    name: 'Histórico do paciente',
    path: ROUTES.dashboard.patients.main,
  },
}

export const BREADCRUMBS: Breadcrumbs = {
  home: {
    icon: HomeIcon,
    name: 'Início',
    path: '/',
  },
  ...PATIENT_SCREENING_BREADCRUMBS,
  ...DASHBOARD_BREADCRUMBS,
}

export type BreadcrumbType = keyof typeof BREADCRUMBS
