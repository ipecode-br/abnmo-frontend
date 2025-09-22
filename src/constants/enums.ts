export const yesOrNoEnum = {
  yes: 'Sim',
  no: 'Não',
} as const
export const YesOrNoTuple = Object.keys(yesOrNoEnum) as ['yes', 'no']

export const PatientStatusEnum = {
  inCrisis: 'Em surto',
  stable: 'Estável',
} as const
export const PatientStatusTuple = Object.keys(PatientStatusEnum) as [
  'inCrisis',
  'stable',
]
