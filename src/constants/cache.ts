export const NEXT_CACHE_TAGS = {
  user: (id: string) => `user/${id}`,
  patient: (id: string) => `patient/${id}`,
  statistics: {
    totalPatientsByStatus: 'total-patients-by-status',
  },
}

export const QUERY_CACHE_KEYS = {
  profile: 'profile',
  patients: {
    allActive: 'patients-all-active',
    list: 'patients-list',
  },
  referrals: {
    list: 'referrals-list',
  },
  approvals: {
    pending: 'approvals-pending',
    approved: 'approvals-approved',
  },
  dashboard: {
    patientsByGender: 'dashboard-patients-by-gender',
    patientsByCity: 'dashboard-patients-by-city',
  },
}
