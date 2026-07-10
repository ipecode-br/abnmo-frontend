import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

export const SURVEY_FEATURES = {
  'read:survey': 'Ver catalogação',
  'read:survey:others': 'Ver outras catalogações',
  'approve:survey': 'Aprovar catalogação',
  'update:survey': 'Atualizar catalogação',
  'delete:survey': 'Excluir catalogação',
}
export const SURVEY_FEATURE_OPTIONS = convertObjectToOptions(SURVEY_FEATURES)

export const PATIENT_FEATURES = {
  'read:patient': 'Ver paciente',
  'read:patient:others': 'Ver outros pacientes',
  'update:patient': 'Atualizar paciente',
  'update:patient:others': 'Atualizar outros pacientes',
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
  'create:user_invite': 'Criar convite de membro',
  'read:user_invite': 'Ver convite de membro',
  'delete:user_invite': 'Excluir convite de membro',
}
export const USER_INVITE_FEATURE_OPTIONS = convertObjectToOptions(
  MEMBER_INVITE_FEATURES,
)

export const FEATURES = {
  ...SURVEY_FEATURES,
  ...PATIENT_FEATURES,
  ...MEMBER_FEATURES,
  ...MEMBER_INVITE_FEATURES,
}
export type Feature = keyof typeof FEATURES

export const BASE_FEATURES: Feature[] = [
  'read:patient',
  'read:user',
  'update:user',
]
