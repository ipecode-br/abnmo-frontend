import {
  ClipboardCheckIcon,
  ClipboardClockIcon,
  ClipboardListIcon,
  ClockArrowUpIcon,
  HistoryIcon,
  PaperclipIcon,
  Share2Icon,
  User2Icon,
  UserRoundCheckIcon,
  UserRoundPlusIcon,
  Users2Icon,
} from 'lucide-react'

import { ROUTES } from '../routes'
import type { Breadcrumbs } from '.'

export const DASHBOARD_BREADCRUMBS: Breadcrumbs = {
  pacientes: {
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
    documentos: {
      icon: PaperclipIcon,
      name: 'Documentos',
      path: ROUTES.dashboard.patients.main,
    },
    cadastrar: {
      icon: UserRoundPlusIcon,
      name: 'Cadastrar novo paciente',
      path: ROUTES.dashboard.patients.new,
    },
  },
  referrals: {
    encaminhamentos: {
      icon: Share2Icon,
      name: 'Encaminhamentos',
      path: ROUTES.dashboard.referrals.main,
    },
    listagem: {
      icon: ClipboardListIcon,
      name: 'Lista de encaminhamentos',
      path: ROUTES.dashboard.referrals.list,
    },
  },
  aprovacoes: {
    aprovacoes: {
      icon: UserRoundCheckIcon,
      name: 'Aprovações',
      path: ROUTES.dashboard.approvals.main,
    },
    'aprovacoes-pendentes': {
      icon: ClipboardClockIcon,
      name: 'Aprovações pendentes',
      path: ROUTES.dashboard.approvals.pendingApprovals,
    },
    'envios-pendentes': {
      icon: ClockArrowUpIcon,
      name: 'Envios pendentes',
      path: ROUTES.dashboard.approvals.pendingSubmissions,
    },
    aprovados: {
      icon: ClipboardCheckIcon,
      name: 'Aprovados',
      path: ROUTES.dashboard.approvals.approved,
    },
  },
}
