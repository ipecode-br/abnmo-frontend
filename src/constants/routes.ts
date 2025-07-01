export function getRoutes(id?: string) {
  return {
    auth: {
      signIn: '/conta/entrar',
      signUp: '/conta/cadastrar',
      forgotPassword: '/conta/recuperar-senha',
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
          info: `/pacientes/${id}/informacoes`,
          history: `/pacientes/${id}/historico`,
        },
      },
      forwarded: {
        main: '/encaminhados',
      },
      approvals: {
        main: '/aprovacoes',
      },
      settings: {
        main: '/configuracoes',
      },
      support: {
        main: '/suporte',
      },
    },
  }
}
