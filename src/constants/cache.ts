export const NEXT_CACHE_TAGS = {
  user: (id: string) => `user/${id}`,
  patient: (id: string) => `patient/${id}`,
  statistics: {
    totalPatientsByStatus: 'total-patients-by-status',
  },
}

export const QUERY_CACHE_KEYS = {
  profile: 'profile',
  patients: 'patients',
  dashboard: {
    patientsByGender: 'dashboard-patients-by-gender',
    patientsByCity: 'dashboard-patients-by-city',
  },
}
