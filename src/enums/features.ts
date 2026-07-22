import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

export const SURVEY_FEATURES = {
  'read:survey:others': 'Ver todas as catalogações',
  'review:survey': 'Avaliar catalogação',
  'update:survey:others': 'Atualizar catalogações',
  'cancel:survey:others': 'Cancelar catalogações',
}
export const SURVEY_FEATURE_OPTIONS = convertObjectToOptions(SURVEY_FEATURES)

export const PATIENT_FEATURES = {
  'read:patient:others': 'Ver todos os pacientes',
  'update:patient:others': 'Atualizar pacientes',
  'activate:patient': 'Ativar paciente',
  'deactivate:patient': 'Desativar paciente',
}
export const PATIENT_FEATURE_OPTIONS = convertObjectToOptions(PATIENT_FEATURES)

export const MEMBER_FEATURES = {
  'read:user:others': 'Ver todos os membros',
  'update:user:others': 'Atualizar membros',
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
  'read:appointment:others': 'Ver todos os atendimentos',
  'update:appointment': 'Atualizar atendimento',
  'update:appointment:others': 'Atualizar atendimentos',
  'cancel:appointment': 'Cancelar atendimento',
  'cancel:appointment:others': 'Cancelar atendimentos',
}
export const APPOINTMENT_FEATURE_OPTIONS =
  convertObjectToOptions(APPOINTMENT_FEATURES)

export const REFERRAL_FEATURES = {
  'create:referral': 'Criar encaminhamento',
  'read:referral': 'Ver encaminhamento',
  'read:referral:others': 'Ver todos os encaminhamentos',
  'update:referral': 'Atualizar encaminhamento',
  'update:referral:others': 'Atualizar encaminhamentos',
  'cancel:referral': 'Cancelar encaminhamento',
  'cancel:referral:others': 'Cancelar encaminhamentos',
}
export const REFERRAL_FEATURE_OPTIONS =
  convertObjectToOptions(REFERRAL_FEATURES)

export const STATISTIC_FEATURES = {
  'read:statistic': 'Ver todas as estatísticas',
  'read:statistic:patient': 'Ver estatísticas de pacientes',
  'read:statistic:appointment': 'Ver estatísticas de atendimentos',
  'read:statistic:referral': 'Ver estatísticas de encaminhamentos',
}
export const STATISTIC_FEATURE_OPTIONS =
  convertObjectToOptions(STATISTIC_FEATURES)

export const FEATURES = {
  ...SURVEY_FEATURES,
  ...PATIENT_FEATURES,
  ...MEMBER_FEATURES,
  ...MEMBER_INVITE_FEATURES,
  ...APPOINTMENT_FEATURES,
  ...REFERRAL_FEATURES,
  ...STATISTIC_FEATURES,
}
export type Feature = keyof typeof FEATURES
