import { ClipboardListIcon, HomeIcon } from 'lucide-react'

import { ROUTES } from '@/constants/routes'

const PATIENT_SCREENING_BREADCRUMBS = {
  triagem: {
    icon: ClipboardListIcon,
    name: 'Formulário de triagem',
    path: ROUTES.screening.forms.patientData,
  },
}

export const BREADCRUMBS = {
  home: {
    icon: HomeIcon,
    name: 'Início',
    path: '/',
  },
  ...PATIENT_SCREENING_BREADCRUMBS,
}

export type BreadcrumbsType = keyof typeof BREADCRUMBS
