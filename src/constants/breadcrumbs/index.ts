import { type LucideIcon } from 'lucide-react'

import { DASHBOARD_BREADCRUMBS } from './dashboard'

type BreadcrumbItem = {
  icon: LucideIcon
  name: string
  path: string
}

export type Breadcrumbs = Record<string, Record<string, BreadcrumbItem>>

export const BREADCRUMBS: Breadcrumbs = {
  ...DASHBOARD_BREADCRUMBS,
  // ...PATIENT_BREADCRUMBS,
}

export type BreadcrumbSection = keyof typeof BREADCRUMBS
export type Breadcrumb = {
  [K in keyof typeof DASHBOARD_BREADCRUMBS]: keyof (typeof DASHBOARD_BREADCRUMBS)[K]
}[keyof typeof DASHBOARD_BREADCRUMBS]
