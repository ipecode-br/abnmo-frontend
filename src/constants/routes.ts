export const ROUTES = {
  auth: {
    signIn: '/conta/entrar',
    signUp: '/conta/cadastrar',
    forgotPassword: '/conta/recuperar-senha',
  },
  screening: {
    main: '/triagem',
    forms: {
      patientData: '/triagem/formularios/seus-dados',
      medicalReport: '/triagem/formularios/laudo-medico',
      supportNetwork: '/triagem/formularios/rede-de-apoio',
    },
  },
} as const
