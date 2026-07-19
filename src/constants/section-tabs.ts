import { ROUTES } from './routes'

type TabButton = {
  title: string
  path: string | ((param: string) => string)
}

export const SECTION_TABS: Record<string, Array<TabButton>> = {
  catalogacao: [
    {
      title: 'Visão geral',
      path: ROUTES.surveys.main,
    },
    {
      title: 'Todas',
      path: ROUTES.surveys.all,
    },
  ],
  pacientes: [
    {
      title: 'Informações',
      path: ROUTES.patients.details.info,
    },
    {
      title: 'Histórico',
      path: ROUTES.patients.details.history,
    },
    // TODO: uncomment documents when it's ready
    // {
    //   title: 'Documentos',
    //   path: ROUTES.patients.details.documents,
    // },
    {
      title: 'Atendimentos',
      path: ROUTES.patients.details.appointments,
    },
    {
      title: 'Encaminhamentos',
      path: ROUTES.patients.details.referrals,
    },
  ],
  atendimentos: [
    {
      title: 'Visão geral',
      path: ROUTES.appointments.main,
    },
    {
      title: 'Lista de atendimentos',
      path: ROUTES.appointments.list,
    },
  ],
  encaminhamentos: [
    {
      title: 'Visão geral',
      path: ROUTES.referrals.main,
    },
    {
      title: 'Lista de encaminhamentos',
      path: ROUTES.referrals.list,
    },
  ],
  aprovacoes: [
    {
      title: 'Aprovações pendentes',
      path: ROUTES.approvals.pendingApprovals,
    },
    {
      title: 'Envios pendentes',
      path: ROUTES.approvals.pendingSubmissions,
    },
    {
      title: 'Aprovados',
      path: ROUTES.approvals.approved,
    },
  ],
  equipe: [
    {
      title: 'Membros',
      path: ROUTES.users.main,
    },
    {
      title: 'Convites',
      path: ROUTES.users.invites,
    },
  ],
}
export type SectionTab = keyof typeof SECTION_TABS
