import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

export const SURVEY_FEATURES = {
  'read:survey': 'Ver catalogação',
  'read:survey:others': 'Ver outras catalogações',
  'review:survey': 'Aprovar catalogação',
  'update:survey': 'Atualizar catalogação',
  'update:survey:others': 'Atualizar outras catalogações',
  'cancel:survey': 'Cancelar catalogação',
  'cancel:survey:others': 'Cancelar outras catalogações',
}
export const SURVEY_FEATURE_OPTIONS = convertObjectToOptions(SURVEY_FEATURES)

export const PATIENT_FEATURES = {
  'read:patient': 'Ver paciente',
  'read:patient:others': 'Ver outros pacientes',
  'update:patient': 'Atualizar paciente',
  'update:patient:others': 'Atualizar outros pacientes',
  'activate:patient': 'Ativar paciente',
  'deactivate:patient': 'Desativar paciente',
}
export const PATIENT_FEATURE_OPTIONS = convertObjectToOptions(PATIENT_FEATURES)

export const MEMBER_FEATURES = {
  'read:user': 'Ver membro',
  'read:user:others': 'Ver outros membros',
  'update:user': 'Atualizar membro',
  'update:user:others': 'Atualizar outros membros',
  'activate:user': 'Ativar membro',
  'deactivate:user': 'Desativar membro',
}
export const MEMBER_FEATURE_OPTIONS = convertObjectToOptions(MEMBER_FEATURES)

export const MEMBER_INVITE_FEATURES = {
  'create:user-invite': 'Criar convite de membro',
  'read:user-invite': 'Ver convite de membro',
  'delete:user-invite': 'Excluir convite de membro',
}
export const USER_INVITE_FEATURE_OPTIONS = convertObjectToOptions(
  MEMBER_INVITE_FEATURES,
)

export const APPOINTMENT_FEATURES = {
  'create:appointment': 'Criar atendimento',
  'read:appointment': 'Ver atendimento',
  'read:appointment:others': 'Ver outros atendimentos',
  'update:appointment': 'Atualizar atendimento',
  'update:appointment:others': 'Atualizar outros atendimentos',
  'cancel:appointment': 'Cancelar atendimento',
  'cancel:appointment:others': 'Cancelar outros atendimentos',
}
export const APPOINTMENT_FEATURE_OPTIONS =
  convertObjectToOptions(APPOINTMENT_FEATURES)

export const REFERRAL_FEATURES = {
  'create:referral': 'Criar encaminhamento',
  'read:referral': 'Ver encaminhamento',
  'read:referral:others': 'Ver outros encaminhamentos',
  'update:referral': 'Atualizar encaminhamento',
  'update:referral:others': 'Atualizar outros encaminhamentos',
  'cancel:referral': 'Cancelar encaminhamento',
  'cancel:referral:others': 'Cancelar outros encaminhamentos',
}
export const REFERRAL_FEATURE_OPTIONS =
  convertObjectToOptions(REFERRAL_FEATURES)

export const FEATURES = {
  ...SURVEY_FEATURES,
  ...PATIENT_FEATURES,
  ...MEMBER_FEATURES,
  ...MEMBER_INVITE_FEATURES,
  ...APPOINTMENT_FEATURES,
  ...REFERRAL_FEATURES,
}
export type Feature = keyof typeof FEATURES

export const BASE_FEATURES: Feature[] = [
  'read:patient',
  'read:user',
  'update:user',
]
