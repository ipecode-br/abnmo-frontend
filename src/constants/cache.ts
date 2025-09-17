export const NEXT_CACHE_TAGS = {
  user: (id: string) => `user/${id}`,
  statistics: {
    totalPatientsByStatus: 'total-patients-by-status',
  },
}

export const QUERY_CACHE_KEYS = {
  profile: 'profile',
  patients: 'patients',
}
