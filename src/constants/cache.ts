export const NEXT_CACHE_TAGS = {
  user: (id: string) => `user/${id}`,
  patient: (id: string) => `patient/${id}`,
  appointments: {
    main: 'appointments',
    dashboard: 'appointments-dashboard',
  },
  statistics: {
    totalPatients: (query: string) => `total-patients/${query}`,
    totalReferrals: (query: string) => `total-referrals/${query}`,
    totalAppointments: (query: string) => `total-appointments/${query}`,
  },
}

export const QUERY_CACHE_KEYS = {
  dashboard: {
    patientsByGender: 'dashboard-patients-by-gender',
    patientsByCity: 'dashboard-patients-by-city',
  },
  patients: {
    main: 'patients',
    allOptions: 'patients-all-options',
  },
  appointments: {
    main: 'appointments',
  },
  referrals: {
    main: 'referrals',
  },
  approvals: {
    main: 'approvals',
    pending: 'approvals-pending',
    approved: 'approvals-approved',
  },
  profile: 'profile',
}
