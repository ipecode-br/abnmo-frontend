import { ROUTES } from './routes'

type TabButton = {
  title: string
  path: string | ((param: string) => string)
}

export const SECTION_TAB_BUTTONS: Record<string, Array<TabButton>> = {
  pacientes: [
    {
      title: 'Informações',
      path: ROUTES.dashboard.patients.details.info,
    },
    {
      title: 'Histórico',
      path: ROUTES.dashboard.patients.details.history,
    },
    // TODO: uncomment documents when it's ready
    // {
    //   title: 'Documentos',
    //   path: ROUTES.dashboard.patients.details.documents,
    // },
    {
      title: 'Atendimentos',
      path: ROUTES.dashboard.patients.details.appointments,
    },
    {
      title: 'Encaminhamentos',
      path: ROUTES.dashboard.patients.details.referrals,
    },
  ],
  encaminhamentos: [
    {
      title: 'Visão geral',
      path: ROUTES.dashboard.referrals.main,
    },
    {
      title: 'Lista de encaminhamentos',
      path: ROUTES.dashboard.referrals.list,
    },
  ],
  aprovacoes: [
    {
      title: 'Aprovações pendentes',
      path: ROUTES.dashboard.approvals.pendingApprovals,
    },
    {
      title: 'Envios pendentes',
      path: ROUTES.dashboard.approvals.pendingSubmissions,
    },
    {
      title: 'Aprovados',
      path: ROUTES.dashboard.approvals.approved,
    },
  ],
  equipe: [
    {
      title: 'Membros',
      path: ROUTES.dashboard.users.main,
    },
    {
      title: 'Convites',
      path: ROUTES.dashboard.users.invites,
    },
  ],
}
export type SectionTabButton = keyof typeof SECTION_TAB_BUTTONS
