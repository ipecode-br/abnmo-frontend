export const SURVEY_SUBMISSION_STATUSES = {
  pending_document: { variant: 'default', label: 'Aguardando laudo' },
  pending_review: { variant: 'default', label: 'Aguardando revisão' },
  declined: { variant: 'error', label: 'Recusada' },
  approved: { variant: 'success', label: 'Aprovada' },
  completed: { variant: 'success', label: 'Concluída' },
} as const
export type SurveySubmissionStatus = keyof typeof SURVEY_SUBMISSION_STATUSES

export const SURVEY_STATUSES = {
  pending_signature: { variant: 'default', label: 'Assinatura' },
  completed: { variant: 'success', label: 'Concluído' },
} as const
export type SurveyStatus = keyof typeof SURVEY_STATUSES

export const SURVEY_STATUS_OPTIONS = Object.entries(SURVEY_STATUSES).map(
  ([key, status]) => ({ label: status.label, value: key }),
)

export const CHILDREN_SCHOOL_SUPPORT_SITUATIONS = {
  no_school_age_children: 'Não tenho filhos em fase escolar',
  lives_with_parent: 'Moro com genitor(a) dos meus filhos',
  receives_alimony: 'Recebo pensão alimentícia',
  has_children_no_alimony:
    'Tenho filhos em fase escolar, mas não recebo pensão',
  other: 'Outro',
}
export type ChildrenSchoolSupportSituation =
  keyof typeof CHILDREN_SCHOOL_SUPPORT_SITUATIONS

export const FAMILY_INCOMES = {
  less_than_one: 'Menos de um salário mínimo',
  one: '1 salário mínimos',
  two: '2 salários mínimos',
  three: '3 salários mínimos',
  four: '4 salários mínimos',
  five: '5 salários mínimos',
  six: '6 salários mínimos',
  seven: '7 salários mínimos',
  eight: '8 salários mínimos',
  nine: '9 salários mínimos',
  ten_or_more: '10 ou mais salários mínimos',
}
export type FamilyIncome = keyof typeof FAMILY_INCOMES

export const HOUSING_SITUATIONS = {
  rented: 'Alugada',
  borrowed: 'Emprestada',
  owned: 'Residência própria',
  family_or_third_party: 'Moro em residência de familiar ou de terceiros',
}
export type HousingSituation = keyof typeof HOUSING_SITUATIONS

export const HOME_ACCESS_LEVELS = {
  full: 'Sim',
  assisted: 'Sim, mas com ajuda',
  none: 'Não',
}
export type HomeAccessLevel = keyof typeof HOME_ACCESS_LEVELS

export const EDUCATION_LEVELS = {
  no_literacy: 'Não tenho letramento',
  elementary_incomplete: 'Ensino fundamental incompleto',
  elementary_complete: 'Ensino fundamental completo',
  high_school_incomplete: 'Ensino médio incompleto',
  high_school_complete: 'Ensino médio completo',
  technical: 'Ensino técnico',
  higher_education_incomplete: 'Ensino superior incompleto',
  higher_education_complete: 'Ensino superior completo',
  postgraduate: 'Pós-graduação',
  masters: 'Mestrado',
  doctorate: 'Doutorado',
}
export type EducationLevel = keyof typeof EDUCATION_LEVELS

export const EMPLOYMENT_STATUSES = {
  on_leave_sickness: 'Afastado (auxílio doença)',
  retired: 'Aposentado',
  retired_disability: 'Aposentado por invalidez',
  bpc_loas: 'Auxílio BPC/LOAS',
  unemployed: 'Desempregado',
  student: 'Estudante',
  employed_formal: 'Trabalhando com carteira assinada',
  self_employed: 'Trabalhando como autônomo',
}
export type EmploymentStatus = keyof typeof EMPLOYMENT_STATUSES

export const STUDY_INTERRUPTION_SITUATIONS = {
  did_not_interrupt: 'Não interrompi',
  interrupted_returned: 'Interrompi, mas consegui retomar os estudos',
  interrupted_not_returned: 'Interrompi e não consegui retomar os estudos',
}
export type StudyInterruptionSituation =
  keyof typeof STUDY_INTERRUPTION_SITUATIONS

export const SALARY_RANGES = {
  none: 'Não recebo',
  less_than_one: 'Menos de um salário',
  one: '1 salário',
  between_one_and_two: 'Entre 1 e 2 salários',
  between_two_and_three: 'Entre 2 e 3 salários',
  between_four_and_five: 'Entre 4 e 5 salários',
  more_than_six: 'Mais de 6 salários',
}
export type SalaryRange = keyof typeof SALARY_RANGES

export const SICKNESS_BENEFIT_STATUSES = {
  receiving: 'Recebo',
  not_receiving: 'Não recebo',
  unaware_of_right: 'Não sei se tenho direito',
  denied: 'Foi negado',
  received_no_longer_needed: 'Já recebi, hoje não preciso mais',
  received_converted_to_retirement: 'Já recebi e converteu para aposentadoria',
  not_entitled: 'Não tenho direito, não era/sou contribuinte do INSS',
  received_suspended: 'Já recebi, mas foi suspenso',
}
export type SicknessBenefitStatus = keyof typeof SICKNESS_BENEFIT_STATUSES

export const BPC_LOAS_STATUSES = {
  receiving: 'Recebo',
  never_requested: 'Nunca solicitei',
  denied: 'Foi negado',
  not_applicable: 'Não se aplica',
}
export type BpcLoasStatus = keyof typeof BPC_LOAS_STATUSES

export const FATIGUE_LEVELS = {
  always: 'Sim, o tempo todo. Até nas atividades diárias mais simples',
  in_heat: 'Sim, no calor',
  sometimes: 'Sim, às vezes',
  no: 'Não',
}
export type FatigueLevel = keyof typeof FATIGUE_LEVELS

export const PHYSICAL_ACTIVITY_FREQUENCIES = {
  four_or_more_week: 'Sim, 4 vezes na semana ou mais',
  three_week: 'Sim, 3 vezes na semana',
  two_week: 'Sim, 2 vezes na semana',
  one_week: 'Sim, 1 vez na semana',
  only_physiotherapy: 'Apenas fisioterapia',
  no: 'Não',
}
export type PhysicalActivityFrequency =
  keyof typeof PHYSICAL_ACTIVITY_FREQUENCIES

export const PHYSICAL_ACTIVITY_TYPES = {
  walking: 'Caminhada',
  running: 'Corrida',
  weight_training: 'Musculação',
  pilates: 'Pilates',
  yoga: 'Yoga',
  swimming: 'Natação',
  water_aerobics: 'Hidroginástica',
  cycling: 'Bicicleta',
  dancing: 'Dança',
  soccer: 'Futebol',
  martial_arts: 'Artes marciais',
  functional: 'Treino funcional',
  other: 'Outro',
}
export type PhysicalActivityType = keyof typeof PHYSICAL_ACTIVITY_TYPES

export const EXERCISE_BEFORE_NMO = {
  walking_1_or_2: 'Caminhada - 1 a 2 vezes por semana',
  walking_3_or_more: 'Caminhada - 3 ou mais vezes por semana',
  running_1_or_2: 'Corrida - 1 a 2 vezes por semana',
  running_3_or_more: 'Corrida - 3 ou mais vezes por semana',
  weight_training: 'Musculação',
  swimming_hydro: 'Natação / Hidroginástica',
  pilates_yoga: 'Pilates / Yoga',
  dancing: 'Dança',
  sports: 'Esportes (futebol, artes marciais, etc.)',
  other: 'Outro',
}
export type ExerciseBeforeNmo = keyof typeof EXERCISE_BEFORE_NMO

export const INFORMATION_SOURCES = {
  with_my_doctor: 'Com meu médico',
  with_other_patients: 'Com outros pacientes',
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  google_or_other_search_engines: 'Google ou outros mecanismos de busca',
  youtube: 'YouTube',
  do_not_seek_information: 'Não procuro informações',
  others: 'Outros',
}
export type InformationSource = keyof typeof INFORMATION_SOURCES

export const TRANSPORT_MODES = {
  ambulance: 'Ambulância',
  carpool: 'Carona',
  app_car: 'Carro de aplicativo',
  own_car: 'Carro próprio',
  app_motorcycle: 'Moto de aplicativo',
  own_motorcycle: 'Moto própria',
  taxi: 'Táxi',
  public_transport: 'Transporte público',
}
export type TransportMode = keyof typeof TRANSPORT_MODES

export const DIAGNOSIS_TYPES = {
  anti_aqp4_positive: 'Anti-AQP4 POSITIVO (REAGENTE)',
  anti_aqp4_negative: 'Anti-AQP4 NEGATIVO (NÃO REAGENTE)',
  anti_mog_positive: 'Anti-MOG POSITIVO',
  both_negative: 'Negativo para ambos',
}
export type DiagnosisType = keyof typeof DIAGNOSIS_TYPES

export const FIRST_CRISIS_SYMPTOMS = {
  vomiting: 'Vômitos',
  hiccups: 'Soluços',
  tingling_lower_limbs: 'Formigamento nos membros inferiores',
  tingling_upper_limbs: 'Formigamento nos membros superiores',
  leg_weakness: 'Perda de força para andar',
  arm_weakness: 'Perda de força em um ou dois braços/mãos',
  bladder_loss: 'Perda de controle da bexiga',
  bowel_loss: 'Perda de controle do intestino',
  vision_loss_one_eye: 'Perda visual em um dos olhos',
  vision_loss_both_eyes: 'Perda visual nos dois olhos',
  numbness_lower_limbs: 'Dormência nos membros inferiores',
  numbness_upper_limbs: 'Dormência nos membros superiores',
  numbness_other: 'Dormência em outras partes do corpo que não braços e pernas',
  other: 'Outros',
}
export type FirstCrisisSymptom = keyof typeof FIRST_CRISIS_SYMPTOMS

export const AFFECTED_AREAS = {
  vision: 'Visão',
  legs: 'Pernas',
  arms: 'Braços',
  intestine: 'Intestino',
  bladder: 'Bexiga',
  trunk: 'Tronco',
  area_postrema: 'Área postrema do cérebro',
}
export type AffectedArea = keyof typeof AFFECTED_AREAS

export const SPECIALTIES_BEFORE_DIAGNOSIS = {
  general_practitioner: 'Clínico geral (Pronto socorro)',
  neurologist: 'Neurologista',
  gastroenterologist: 'Gastroenterologista',
  ophthalmologist: 'Oftalmologista',
  infectologist: 'Infectologista',
  rheumatologist: 'Reumatologista',
  orthopedist: 'Ortopedista',
  physiotherapist: 'Fisioterapeuta',
  pediatrician: 'Pediatra',
  nephrologist: 'Nefrologista',
  psychiatrist: 'Psiquiatra',
  angiologist: 'Angiologista',
  physiatrist: 'Fisiatra',
  otorhinolaryngologist: 'Otorrinolaringologista',
  urologist: 'Urologista',
  psychology: 'Psicologia',
}
export type SpecialtyBeforeDiagnosis = keyof typeof SPECIALTIES_BEFORE_DIAGNOSIS

export const TREATMENT_LOCATIONS = {
  lives_in_capital: 'Sim, moro na capital do meu estado',
  lives_in_interior: 'Sim, moro no interior do meu estado',
  goes_to_capital: 'Não, eu vou para a capital do meu estado',
  goes_to_other_interior: 'Não, eu vou para outra cidade também do interior',
}
export type TreatmentLocation = keyof typeof TREATMENT_LOCATIONS

export const CRISIS_ACTIONS = {
  reference_doctor: 'Entro em contato com meu médico de referência',
  reference_hospital: 'Procuro o meu hospital de referência',
  upa: 'Vou para UPA',
  psf: 'Vou para o PSF',
  hospital_emergency: 'Vou para emergência do hospital na minha cidade',
  hospital_emergency_other_city:
    'Vou para emergência do hospital em outra cidade',
  no_assistance: 'Não procuro assistência de saúde',
}
export type CrisisAction = keyof typeof CRISIS_ACTIONS

export const FOLLOW_UP_HOW = {
  sus: 'SUS',
  private: 'Particular',
  health_insurance: 'Plano de saúde',
  sus_and_insurance: 'SUS e Plano de saúde',
  sus_and_private: 'SUS e Particular',
  not_treating: 'Não estou me tratando',
}
export type FollowUpHow = keyof typeof FOLLOW_UP_HOW

export const FOLLOW_UP_SPECIALTIES = {
  neurologist: 'Neurologista',
  physiotherapist: 'Fisioterapeuta',
  physical_educator: 'Educador físico',
  occupational_therapist: 'Terapeuta ocupacional',
  nutritionist: 'Nutricionista',
  speech_therapist: 'Fonoaudiólogo',
  ophthalmologist: 'Oftalmologista',
  psychologist: 'Psicólogo',
  psychiatrist: 'Psiquiatra',
  alternative_therapist: 'Terapeuta alternativo',
  other: 'Outros',
}
export type FollowUpSpecialty = keyof typeof FOLLOW_UP_SPECIALTIES

export const LEGAL_ACTIONS = {
  yes_obtained: 'Sim, precisei acionar a justiça',
  yes_denied: 'Sim, acionei na justiça e foi negado',
  no_sus: 'Não, eu consegui normalmente pelo SUS',
  no_insurance: 'Não, eu consegui normalmente pelo plano de saúde',
  buys_medication: 'Compro a medicação',
}
export type LegalAction = keyof typeof LEGAL_ACTIONS

export const DAILY_ACTIVITY_ASSISTANCES = {
  all_activities: 'Sim, necessito de ajuda para TODAS as atividades',
  some_activities: 'Sim, necessito de ajuda para ALGUMAS atividades',
  no: 'Não',
}
export type DailyActivityAssistance = keyof typeof DAILY_ACTIVITY_ASSISTANCES

export const VISUAL_ASSISTIVE_TECHNOLOGIES = {
  glasses: 'Óculos',
  computer_accessibility: 'Recursos de acessibilidade do computador',
  phone_accessibility: 'Recursos de acessibilidade do celular',
  magnifier: 'Lupa',
  none: 'Não utilizo',
}
export type VisualAssistiveTechnology =
  keyof typeof VISUAL_ASSISTIVE_TECHNOLOGIES

export const WALKING_DISTANCES = {
  less_than_10m: 'Menos de 10 metros',
  between_10_and_500m: 'Entre 10 e 500 metros',
  more_than_500m: 'Mais de 500 metros',
}
export type WalkingDistance = keyof typeof WALKING_DISTANCES

export const BLADDER_CONTROLS = {
  yes: 'Sim',
  yes_urgent: 'Sim, mas preciso ir rápido ao banheiro',
  no_leak: 'Não, às vezes perco urina na roupa',
  no_catheter: 'Não, realizo cateterismo vesical',
  no_device: 'Não, utilizo dispositivo urinário',
  no_diapers: 'Não, utilizo fraldas',
}
export type BladderControl = keyof typeof BLADDER_CONTROLS

export const BOWEL_FUNCTIONS = {
  daily: 'Tenho evacuações diárias',
  every_2_3_days: 'Tenho evacuações a cada 2 a 3 dias',
  more_than_5_days: 'Fico mais de 5 dias sem evacuar',
  stool_leakage: 'Tenho escapes de fezes ao longo do dia',
}
export type BowelFunction = keyof typeof BOWEL_FUNCTIONS

export const FAMILY_SUPPORT = {
  not_need: 'Não preciso de apoio, estou bem',
  always: 'Sim, sempre que preciso',
  sometimes: 'Sim, às vezes',
  not_as_id_like: 'Não como eu gostaria',
  no_family: 'Não tenho família',
  no: 'Não',
}
export type FamilySupportType = keyof typeof FAMILY_SUPPORT

export const BLOOD_TYPES = {
  A_positive: 'A+ (positivo)',
  A_negative: 'A- (negativo)',
  B_positive: 'B+ (positivo)',
  B_negative: 'B- (negativo)',
  AB_positive: 'AB+ (positivo)',
  AB_negative: 'AB- (negativo)',
  O_positive: 'O+ (positivo)',
  O_negative: 'O- (negativo)',
  unknown: 'Não sei',
}
export type BloodType = keyof typeof BLOOD_TYPES
