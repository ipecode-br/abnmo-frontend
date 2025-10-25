export const ROUTES = {
  auth: {
    signIn: '/conta/entrar',
    signUp: '/conta/cadastrar',
    forgotPassword: '/conta/recuperar-senha',
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
        history: (id: string) => `/pacientes/${id}/historico`,
      },
    },
    forwarded: {
      main: '/encaminhados',
    },
    approvals: {
      main: '/aprovacoes',
    },
    teams: {
      main: '/equipes',
      specialists: '/equipes/especialistas',
    },
    settings: {
      main: '/configuracoes',
    },
    support: {
      main: '/suporte',
    },
  },
}
