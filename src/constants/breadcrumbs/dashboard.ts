import { HistoryIcon, User2Icon, Users2Icon } from 'lucide-react'

import { ROUTES } from '../routes'
import type { Breadcrumbs } from '.'

export const DASHBOARD_BREADCRUMBS: Breadcrumbs = {
  pacientes: {
    icon: Users2Icon,
    name: 'Pacientes',
    path: ROUTES.dashboard.patients.main,
  },
  informacoes: {
    icon: User2Icon,
    name: 'Informações do paciente',
    path: ROUTES.dashboard.patients.main,
  },
  historico: {
    icon: HistoryIcon,
    name: 'Histórico do paciente',
    path: ROUTES.dashboard.patients.main,
  },
}
