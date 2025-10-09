import {
  HistoryIcon,
  Paperclip,
  User2Icon,
  UserCog2Icon,
  Users2Icon,
} from 'lucide-react'

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
  documentos: {
    icon: Paperclip,
    name: 'Documentos',
    path: ROUTES.dashboard.patients.main,
  },
  historico: {
    icon: HistoryIcon,
    name: 'Histórico do paciente',
    path: ROUTES.dashboard.patients.main,
  },
  equipes: {
    icon: UserCog2Icon,
    name: 'Equipes',
    path: ROUTES.dashboard.teams.main,
  },
}
