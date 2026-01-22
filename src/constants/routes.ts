export const ROUTES = {
  auth: {
    signIn: '/conta/entrar',
    signUp: '/conta/cadastrar',
    forgotPassword: '/conta/recuperar-senha',
    resetPassword: '/conta/nova-senha',
    registerUser: '/conta/cadastrar/usuario',
    signOut: '/api/sair',
  },
  patient: {
    main: '/paciente',
    screening: {
      patientData: '/paciente/triagem/seus-dados',
      medicalReport: '/paciente/triagem/laudo-medico',
      supportNetwork: '/paciente/triagem/rede-de-apoio',
    },
    documents: {
      pending: '/paciente/documentos/pendentes',
      sent: '/paciente/documentos/enviados',
    },
  },
  dashboard: {
    main: '/',
    patients: {
      main: '/pacientes',
      new: '/pacientes/cadastrar',
      details: {
        info: (id: string) => `/pacientes/${id}/informacoes`,
        documents: (id: string) => `/pacientes/${id}/documentos`,
        history: (id: string) => `/pacientes/${id}/historico`,
      },
    },
    referrals: {
      main: '/encaminhamentos',
      list: '/encaminhamentos/listagem',
    },
    appointments: {
      main: '/atendimentos',
      list: '/atendimentos/listagem',
    },
    approvals: {
      main: '/aprovacoes',
      pendingApprovals: '/aprovacoes/aprovacoes-pendentes',
      pendingSubmissions: '/aprovacoes/envios-pendentes',
      approved: '/aprovacoes/aprovados',
    },
    team: {
      main: '/equipe',
    },
    settings: {
      main: '/configuracoes',
      fontSize: '/configuracoes/fontes',
    },
    profile: '/perfil',
  },
}
