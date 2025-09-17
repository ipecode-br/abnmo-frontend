import { ComponentProps } from 'react'

import {
  PATIENT_CONDITION_ICONS_AND_COLOR,
  PATIENT_CONDITIONS,
  PatientConditionType,
} from '@/types/patients'
import { cn } from '@/utils/class-name-merge'

import { Tag } from '../ui/tag'

export type AppointmentConditionTagProps = {
  label: PatientConditionType
} & ComponentProps<'div'>

export function AppointmentConditionTag({
  label,
  className,
  ...props
}: AppointmentConditionTagProps) {
  const {
    icon: Icon,
    tagClassName,
    iconClassName,
  } = PATIENT_CONDITION_ICONS_AND_COLOR[label]
  return (
    <Tag className={cn(tagClassName, className)} {...props}>
      <Icon className={cn(iconClassName)} />
      {PATIENT_CONDITIONS[label]}
    </Tag>
  )
}
