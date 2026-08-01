export const ROUTES = {
  auth: {
    signIn: '/entrar',
    signUp: '/cadastrar',
    forgotPassword: '/recuperar-senha',
    resetPassword: '/nova-senha',
    clearSession: '/api/limpar-sessao',
  },
  patient: {
    main: '/paciente',
    documents: {
      pending: '/paciente/documentos/pendentes',
      sent: '/paciente/documentos/enviados',
    },
  },
  // Dashboard
  main: '/',
  menu: '/menu',
  surveys: {
    main: '/catalogacao',
    submissions: '/catalogacao/solicitacoes',
    all: '/catalogacao/todas',
    details: (id: string) => `/catalogacao/${id}/detalhes`,
  },
  patients: {
    main: '/pacientes',
    details: {
      info: (id: string) => `/pacientes/${id}/informacoes`,
      history: (id: string) => `/pacientes/${id}/historico`,
      documents: (id: string) => `/pacientes/${id}/documentos`,
      referrals: (id: string) => `/pacientes/${id}/encaminhamentos`,
      appointments: (id: string) => `/pacientes/${id}/atendimentos`,
    },
  },
  referrals: {
    main: '/encaminhamentos',
    list: '/encaminhamentos/lista',
  },
  appointments: {
    main: '/atendimentos',
    list: '/atendimentos/lista',
  },
  approvals: {
    main: '/aprovacoes',
    pendingApprovals: '/aprovacoes/aprovacoes-pendentes',
    pendingSubmissions: '/aprovacoes/envios-pendentes',
    approved: '/aprovacoes/aprovados',
  },
  users: {
    main: '/equipe',
    details: (id: string) => `/equipe/${id}`,
    invites: '/equipe/convites',
  },
  settings: {
    main: '/configuracoes',
    fontSize: '/configuracoes/fontes',
  },
  profile: '/perfil',
}
