import {
  ClipboardListIcon,
  History,
  HomeIcon,
  type LucideIcon,
  User2,
  Users2,
} from 'lucide-react'

import { getRoutes } from '@/constants/routes'

type BreadcrumbDataType = {
  icon: LucideIcon
  name: string
  path: string
}

type Breadcrumbs = Record<string, BreadcrumbDataType>

const routes = getRoutes()

const PATIENT_SCREENING_BREADCRUMBS: Breadcrumbs = {
  paciente: {
    icon: HomeIcon,
    name: 'Início',
    path: routes.patient.main,
  },
  triagem: {
    icon: ClipboardListIcon,
    name: 'Formulário de triagem',
    path: routes.patient.screening.patientData,
  },
}

const DASHBOARD_BREADCRUMBS: Breadcrumbs = {
  pacientes: {
    icon: Users2,
    name: 'Pacientes',
    path: routes.dashboard.patients.main,
  },
  informacoes: {
    icon: User2,
    name: 'Informações do paciente',
    path: routes.dashboard.patients.main,
  },
  historico: {
    icon: History,
    name: 'Histórico do paciente',
    path: routes.dashboard.patients.main,
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
