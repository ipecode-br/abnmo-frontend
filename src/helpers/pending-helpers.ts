import { differenceInDays } from 'date-fns'

export const getPendingDays = (createdAt: Date | string): number => {
  return differenceInDays(new Date(), new Date(createdAt))
}

export const getPendingStatusColor = (
  daysPending: number,
): 'error' | 'warning' | 'default' => {
  if (daysPending >= 7) return 'error'
  if (daysPending >= 4) return 'warning'
  return 'default'
}
