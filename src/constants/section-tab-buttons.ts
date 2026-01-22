import { ROUTES } from './routes'

type TabButton = {
  title: string
  path: string | ((param: string) => string)
}

export const SECTION_TAB_BUTTONS: Record<string, Array<TabButton>> = {
  pacientes: [
    {
      title: 'Informações do paciente',
      path: ROUTES.dashboard.patients.details.info,
    },
    {
      title: 'Histórico do paciente',
      path: ROUTES.dashboard.patients.details.history,
    },
    {
      title: 'Documentos',
      path: ROUTES.dashboard.patients.details.documents,
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
}
export type SectionTabButton = keyof typeof SECTION_TAB_BUTTONS
