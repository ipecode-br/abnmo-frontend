import {
  BrazilState,
  Gender,
  MaritalStatus,
  Race,
  TimeUnit,
} from '@/enums/shared'
import {
  AffectedArea,
  BladderControl,
  BloodType,
  BowelFunction,
  BpcLoasStatus,
  ChildrenSchoolSupportSituation,
  CrisisAction,
  DailyActivityAssistance,
  DiagnosisType,
  EducationLevel,
  EmploymentStatus,
  ExerciseBeforeNmo,
  FamilyIncome,
  FamilySupportType,
  FatigueLevel,
  FirstCrisisSymptom,
  FollowUpHow,
  FollowUpSpecialty,
  HomeAccessLevel,
  HousingSituation,
  InformationSource,
  LegalAction,
  PhysicalActivityFrequency,
  PhysicalActivityType,
  SalaryRange,
  SicknessBenefitStatus,
  SpecialtyBeforeDiagnosis,
  StudyInterruptionSituation,
  SurveyStatus,
  SurveySubmissionStatus,
  TransportMode,
  TreatmentLocation,
  VisualAssistiveTechnology,
  WalkingDistance,
} from '@/enums/surveys'

export type SurveySubmissionDocument = {
  key: string
  url: string
  name: string
  filename: string
  size: number
  mimeType: 'image/jpeg' | 'image/jpg' | 'image/png' | 'application/pdf'
}

export type SurveySubmissionUpdatedBy = {
  id: string
  name: string
  email: string
  avatarUrl: string | null
}

export type SurveySubmission = {
  id: string
  status: SurveySubmissionStatus
  reason: string | null
  updatedAt: string
  createdAt: string
  name: string
  email: string
  phone: string
  document: SurveySubmissionDocument | null
  updatedBy: SurveySubmissionUpdatedBy | null
}

export type SurveySubmissionListItem = Pick<
  SurveySubmission,
  'id' | 'name' | 'email' | 'phone' | 'status' | 'reason' | 'createdAt'
>

export type SurveyUser = {
  id: string
  name: string
  phone: string
  email: string
  cpf: string
  susId: string | null
}

export type Survey = {
  user: SurveyUser
  id: string
  status: SurveyStatus
  signatureId: string | null
  dateOfBirth: string
  gender: Gender
  race: Race
  maritalStatus: MaritalStatus
  addressCep: string
  addressState: BrazilState
  addressCity: string
  addressStreet: string
  addressNumber: string | null
  addressNeighborhood: string | null
  hasLivedElsewhere: boolean
  livedElsewhereDescription: string | null
  numberOfChildren: number
  childrenAges: number[] | null
  childrenSchoolSupportSituation: ChildrenSchoolSupportSituation | null
  familyIncome: FamilyIncome
  housingSituation: HousingSituation
  householdSize: number
  houseRooms: number
  houseBathrooms: number
  homeAccessLevel: HomeAccessLevel
  transportModes: TransportMode[]
  educationLevel: EducationLevel
  employmentStatus: EmploymentStatus
  studyInterruption: StudyInterruptionSituation | null
  profession: string | null
  jobTitle: string | null
  salaryRange: SalaryRange
  dismissedAfterDiagnosis: boolean | null
  changedProfession: boolean
  changedProfessionTo: string | null
  currentJobIsPcd: boolean | null
  receivesSicknessBenefit: SicknessBenefitStatus
  receivesBpcLoas: BpcLoasStatus
  diagnosis: DiagnosisType
  firstCrisisSymptoms: FirstCrisisSymptom[]
  affectedAreas: AffectedArea[]
  diagnosingDoctorName: string | null
  diagnosisHospitalName: string | null
  diagnosisHospitalCep: string | null
  diagnosisHospitalState: BrazilState | null
  diagnosisHospitalCity: string | null
  diagnosisHospitalStreet: string | null
  diagnosisDate: string
  diagnosisDocument: string | null
  currentNeurologist: string | null
  currentTreatmentHospital: string | null
  currentTreatmentHospitalCep: string | null
  specialistsBeforeDiagnosis: SpecialtyBeforeDiagnosis[]
  timeToDiagnosis: number
  timeToDiagnosisUnit: TimeUnit
  suspectedMultipleSclerosis: boolean | null
  otherSuspectedDiseases: string | null
  crisesBeforeDiagnosis: number | null
  crisesSinceDiagnosis: number | null
  treatmentInHomeCity: TreatmentLocation
  hasNeurologistsInCity: boolean | null
  crisisAction: CrisisAction
  followUpSpecialties: FollowUpSpecialty[]
  otherFollowUpProfessionals: string[]
  followUpHow: FollowUpHow
  hasHealthInsurance: boolean
  nmoMedications: string[]
  crisesAfterMedication: number | null
  legalActionForMedication: LegalAction
  generalMedications: string[]
  hasVisualAlteration: boolean
  usesVisualCane: boolean | null
  visualImpairmentAssistance: DailyActivityAssistance | null
  visualAssistiveTechnologies: VisualAssistiveTechnology[]
  usesWheelchair: boolean
  hasMotorSequelae: boolean
  motorImpairmentAssistance: DailyActivityAssistance | null
  walkingDistance: WalkingDistance | null
  usesWalkingAid: boolean
  bladderControl: BladderControl
  bowelFunction: BowelFunction
  otherSequelae: string | null
  psychologicalMedsBeforeNmo: boolean
  psychologicalMedsAfterNmo: boolean
  psychologicalDiagnosisAfterNmo: boolean
  bloodType: BloodType | null
  hasOtherDisease: boolean
  otherDiseaseDescription: string | null
  familySupport: FamilySupportType
  fatigue: FatigueLevel
  physicalActivity: PhysicalActivityFrequency
  physicalActivityType: PhysicalActivityType | null
  exercisedBeforeNmo: boolean
  exercisesBeforeNmo: ExerciseBeforeNmo | null
  informationSources: InformationSource[]
  lifePerception: string
  dreams: string
  additionalInfo: string
  updatedAt: string
  createdAt: string
}

export type SurveyListItem = Pick<Survey, 'id' | 'status' | 'createdAt'> &
  Pick<SurveyUser, 'name' | 'phone' | 'email'>
