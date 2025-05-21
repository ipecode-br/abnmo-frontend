export const yesOrNoEnum = {
  yes: 'Sim',
  no: 'Não',
} as const

export const YesOrNoTuple = Object.keys(yesOrNoEnum) as ['yes', 'no']
