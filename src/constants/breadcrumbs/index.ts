import { HomeIcon, type LucideIcon } from 'lucide-react'

import { ROUTES } from '../routes'
import { DASHBOARD_BREADCRUMBS } from './dashboard'
import { PATIENT_BREADCRUMBS } from './patient'

type BreadcrumbDataType = {
  icon: LucideIcon
  name: string
  path: string
}

export type Breadcrumbs = Record<string, BreadcrumbDataType>

export const BREADCRUMBS: Breadcrumbs = {
  home: {
    icon: HomeIcon,
    name: 'Início',
    path: ROUTES.dashboard.main,
  },
  ...PATIENT_BREADCRUMBS,
  ...DASHBOARD_BREADCRUMBS,
}

export type BreadcrumbType = keyof typeof BREADCRUMBS
