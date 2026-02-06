export const NEXT_CACHE_TAGS = {
  user: (id: string) => `user/${id}`,
  patient: (id: string) => `patient/${id}`,
  appointments: {
    main: 'appointments',
    query: (query: string) => `appointments/${query}`,
  },
  referrals: {
    main: 'referrals',
    query: (query: string) => `referrals/${query}`,
  },
  statistics: {
    totalAppointments: {
      main: 'total-appointments',
      query: (query: string) => `total-appointments/${query}`,
    },
    totalPatients: {
      main: 'total-patients',
      query: (query: string) => `total-patients/${query}`,
    },
    totalReferrals: {
      main: 'total-referrals',
      query: (query: string) => `total-referrals/${query}`,
    },
    totalReferredPatients: {
      main: 'total-referred-patients',
      query: (query: string) => `total-referred-patients/${query}`,
    },
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
  statistics: {
    totalReferrals: 'total-referrals',
    referralsByCategory: 'referrals-by-category',
    referralsByState: 'referrals-by-state',
  },
  profile: 'profile',
}
