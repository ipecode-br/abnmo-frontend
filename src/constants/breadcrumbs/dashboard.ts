import {
  ClipboardCheckIcon,
  ClipboardClockIcon,
  ClipboardListIcon,
  ClipboardPasteIcon,
  ClockArrowUpIcon,
  FileUserIcon,
  HistoryIcon,
  LayoutListIcon,
  MailPlusIcon,
  PaperclipIcon,
  User2Icon,
  UserRoundCheckIcon,
  Users2Icon,
} from 'lucide-react'

import { ROUTES } from '../routes'
import type { Breadcrumbs } from '.'

export const DASHBOARD_BREADCRUMBS: Breadcrumbs = {
  catalogacao: {
    catalogacao: {
      icon: ClipboardListIcon,
      name: 'Catalogação',
      path: ROUTES.surveys.main,
    },
    todas: {
      icon: LayoutListIcon,
      name: 'Todas',
      path: ROUTES.surveys.all,
    },
    detalhes: {
      icon: FileUserIcon,
      name: 'Detalhes da catalogação',
      path: ROUTES.surveys.main,
    },
  },
  pacientes: {
    pacientes: {
      icon: Users2Icon,
      name: 'Pacientes',
      path: ROUTES.patients.main,
    },
    informacoes: {
      icon: User2Icon,
      name: 'Informações do paciente',
      path: ROUTES.patients.main,
    },
    historico: {
      icon: HistoryIcon,
      name: 'Histórico do paciente',
      path: ROUTES.patients.main,
    },
    documentos: {
      icon: PaperclipIcon,
      name: 'Documentos',
      path: ROUTES.patients.main,
    },
    atendimentos: {
      icon: ClipboardCheckIcon,
      name: 'Atendimentos do paciente',
      path: ROUTES.patients.main,
    },
    encaminhamentos: {
      icon: ClipboardPasteIcon,
      name: 'Encaminhamentos do paciente',
      path: ROUTES.patients.main,
    },
  },
  atendimentos: {
    atendimentos: {
      icon: ClipboardCheckIcon,
      name: 'Atendimentos',
      path: ROUTES.appointments.main,
    },
    lista: {
      icon: ClipboardListIcon,
      name: 'Lista de atendimentos',
      path: ROUTES.appointments.list,
    },
  },
  encaminhamentos: {
    encaminhamentos: {
      icon: ClipboardPasteIcon,
      name: 'Encaminhamentos',
      path: ROUTES.referrals.main,
    },
    lista: {
      icon: ClipboardListIcon,
      name: 'Lista de encaminhamentos',
      path: ROUTES.referrals.list,
    },
  },
  aprovacoes: {
    aprovacoes: {
      icon: UserRoundCheckIcon,
      name: 'Aprovações',
      path: ROUTES.approvals.main,
    },
    'aprovacoes-pendentes': {
      icon: ClipboardClockIcon,
      name: 'Aprovações pendentes',
      path: ROUTES.approvals.pendingApprovals,
    },
    'envios-pendentes': {
      icon: ClockArrowUpIcon,
      name: 'Envios pendentes',
      path: ROUTES.approvals.pendingSubmissions,
    },
    aprovados: {
      icon: ClipboardCheckIcon,
      name: 'Aprovados',
      path: ROUTES.approvals.approved,
    },
  },
  equipe: {
    equipe: {
      icon: Users2Icon,
      name: 'Membros',
      path: ROUTES.users.main,
    },
    convites: {
      icon: MailPlusIcon,
      name: 'Convites',
      path: ROUTES.users.invites,
    },
  },
}
