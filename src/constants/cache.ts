export const NEXT_CACHE_TAGS = {
  user: (id: string) => `user/${id}`,
  patient: (id: string) => `patient/${id}`,
  appointments: (query: string) => `appointments/${query}`,
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
    allOptions: 'patients-all-options',
    list: 'patients-list',
  },
  appointments: {
    list: 'appointments-list',
  },
  referrals: {
    list: 'referrals-list',
  },
  approvals: {
    pending: 'approvals-pending',
    approved: 'approvals-approved',
  },
  profile: 'profile',
}
