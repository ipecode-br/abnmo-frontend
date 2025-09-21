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
  },
  dashboard: {
    main: '/',
    patients: {
      main: '/pacientes',
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
    members: {
      main: '/membros',
    },
    settings: {
      main: '/configuracoes',
    },
    support: {
      main: '/suporte',
    },
  },
}
