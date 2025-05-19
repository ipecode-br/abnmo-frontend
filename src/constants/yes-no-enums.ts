export const yesOrNoEnum = {
  YES: 'yes',
  NO: 'no',
} as const

export type YesOrNo = (typeof yesOrNoEnum)[keyof typeof yesOrNoEnum]
