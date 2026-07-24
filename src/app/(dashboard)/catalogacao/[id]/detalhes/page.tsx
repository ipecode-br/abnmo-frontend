import {
  ActivityIcon,
  EyeIcon,
  GraduationCapIcon,
  HeartPulseIcon,
  HospitalIcon,
  UserCircleIcon,
  Users2Icon,
} from 'lucide-react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { canUser } from '@/actions/auth/can-user'
import { getSurvey } from '@/actions/surveys/get-survey'
import { Card, CardHeader } from '@/components/ui/card'
import {
  DataDisplay,
  DataField,
  DataList,
  DataRow,
} from '@/components/ui/data-display'
import { NavButton } from '@/components/ui/nav-button'
import { Tag } from '@/components/ui/tag'
import { ROUTES } from '@/constants/routes'
import {
  BRAZIL_STATES,
  GENDERS,
  MARITAL_STATUSES,
  RACES,
  TIME_UNITS,
} from '@/enums/shared'
import {
  AFFECTED_AREAS,
  BLADDER_CONTROLS,
  BLOOD_TYPES,
  BOWEL_FUNCTIONS,
  BPC_LOAS_STATUSES,
  CHILDREN_SCHOOL_SUPPORT_SITUATIONS,
  CRISIS_ACTIONS,
  DAILY_ACTIVITY_ASSISTANCES,
  DIAGNOSIS,
  EDUCATION_LEVELS,
  EMPLOYMENT_STATUSES,
  FAMILY_INCOMES,
  FAMILY_SUPPORT,
  FATIGUE_LEVELS,
  FIRST_CRISIS_SYMPTOMS,
  FOLLOW_UP_HOW,
  FOLLOW_UP_SPECIALTIES,
  HOME_ACCESS_LEVELS,
  HOUSING_SITUATIONS,
  INFORMATION_SOURCES,
  LEGAL_ACTIONS,
  PHYSICAL_ACTIVITY_FREQUENCIES,
  PHYSICAL_ACTIVITY_TYPES,
  SALARY_RANGES,
  SICKNESS_BENEFIT_STATUSES,
  SPECIALTIES_BEFORE_DIAGNOSIS,
  STUDY_INTERRUPTION_SITUATIONS,
  SURVEY_STATUSES,
  TRANSPORT_MODES,
  TREATMENT_LOCATIONS,
  VISUAL_ASSISTIVE_TECHNOLOGIES,
  WALKING_DISTANCES,
} from '@/enums/surveys'
import { SendSurveySignatureReminderButton } from '@/modules/surveys/send-reminder-button'
import { formatCepNumber } from '@/utils/formatters/format-cep-number'
import { formatCpfNumber } from '@/utils/formatters/format-cpf-number'
import { formatDate } from '@/utils/formatters/format-date'
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'

export const metadata: Metadata = {
  title: 'Informações da catalogação',
}

interface PageParams {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Readonly<PageParams>) {
  const id = (await params).id

  const [canAccess, survey] = await Promise.all([
    canUser('read:survey:others'),
    getSurvey(id),
  ])

  if (!canAccess) {
    redirect(ROUTES.main)
  }

  if (!survey) {
    redirect(ROUTES.surveys.main)
  }

  const surveyStatus = SURVEY_STATUSES[survey.status]
  const patient = survey.patient

  const showUpdatedAt = new Date(survey.updatedAt) > new Date(survey.createdAt)
  const showReminderButton =
    survey.status === 'pending_signature' && survey.signatureId

  function renderValueOrNotProvided(value?: string | number | null): string {
    return value === undefined || value === null
      ? 'Não informado / Não lembra'
      : String(value)
  }

  function renderYesNo(value?: boolean | null): string {
    if (value === undefined || value === null) {
      return 'Não informado / Não lembra'
    }
    return value ? 'Sim' : 'Não'
  }

  return (
    <>
      <header className='space-y-4'>
        <div className='flex flex-wrap justify-between gap-4 max-md:flex-col md:items-center'>
          <h3 className='text-2xl font-medium md:text-3xl lg:text-4xl'>
            {patient.name}
          </h3>

          <div className='flex flex-wrap gap-4'>
            {showReminderButton && (
              <SendSurveySignatureReminderButton
                id={survey.id}
                className='flex-1 md:w-44'
              />
            )}
            <NavButton
              href={ROUTES.patients.details.info(patient.id)}
              className='max-md:flex-1'
              variant='outline'
            >
              <EyeIcon />
              Ver paciente
            </NavButton>
          </div>
        </div>
        <div className='flex flex-wrap items-center gap-4'>
          <Tag variant={surveyStatus.variant} size='sm'>
            {surveyStatus.label}
          </Tag>
          <div className='text-foreground-soft flex flex-wrap gap-1 text-sm'>
            <span>
              Enviado em {formatDate(survey.createdAt, { dateStyle: 'long' })}.
            </span>
            {showUpdatedAt && (
              <span>
                Atualizado em{' '}
                {formatDate(survey.updatedAt, { dateStyle: 'long' })}.
              </span>
            )}
          </div>
        </div>
      </header>

      <Card>
        <CardHeader icon={UserCircleIcon} title='Dados pessoais' />
        <DataDisplay>
          <DataRow>
            <DataField label='Telefone'>
              {formatPhoneNumber(patient.phone)}
            </DataField>
            <DataField label='E-mail'>{patient.email}</DataField>
            <DataField label='CPF'>{formatCpfNumber(patient.cpf)}</DataField>
            <DataField label='Data de nascimento'>
              {formatDate(survey.dateOfBirth, { dateStyle: 'short' })}
            </DataField>
            <DataField label='Número do SUS'>{patient.susId}</DataField>
          </DataRow>

          <DataRow>
            <DataField label='Gênero'>{GENDERS[survey.gender]}</DataField>
            <DataField label='Raça'>{RACES[survey.race]}</DataField>
            <DataField label='Estado civil'>
              {MARITAL_STATUSES[survey.maritalStatus]}
            </DataField>
            <DataField label='CEP'>
              {formatCepNumber(survey.addressCep)}
            </DataField>
            <DataField label='Estado'>
              {BRAZIL_STATES[survey.addressState]}
            </DataField>
            <DataField label='Cidade'>{survey.addressCity}</DataField>
            <DataField label='Rua'>{survey.addressStreet}</DataField>
            <DataField label='Número'>{survey.addressNumber}</DataField>
            <DataField label='Bairro'>{survey.addressNeighborhood}</DataField>
          </DataRow>

          <DataRow>
            <DataField label='Morou em outro lugar'>
              {survey.hasLivedElsewhere ? 'Sim' : 'Não'}
            </DataField>
            <DataField label='Descrição'>
              {survey.livedElsewhereDescription}
            </DataField>
          </DataRow>
        </DataDisplay>
      </Card>

      <div className='grid gap-6 lg:grid-cols-2'>
        <Card className='p-6'>
          <CardHeader icon={Users2Icon} title='Dados familiares' />
          <DataDisplay>
            <DataRow>
              <DataField label='Número de filhos'>
                {survey.numberOfChildren}
              </DataField>
              <DataField label='Idade dos filhos'>
                {survey.childrenAges?.map(String).join(', ') ?? null}
              </DataField>
              <DataField label='Pensão alimentícia para filhos em fase escolar'>
                {survey.childrenSchoolSupportSituation
                  ? CHILDREN_SCHOOL_SUPPORT_SITUATIONS[
                      survey.childrenSchoolSupportSituation
                    ]
                  : null}
              </DataField>
            </DataRow>

            <DataRow>
              <DataField label='Renda familiar'>
                {FAMILY_INCOMES[survey.familyIncome]}
              </DataField>
              <DataField label='Situação de moradia'>
                {HOUSING_SITUATIONS[survey.housingSituation]}
              </DataField>
            </DataRow>

            <DataRow>
              <DataField label='Pessoas na casa'>
                {String(survey.householdSize)}
              </DataField>
              <DataField label='Cômodos'>{survey.houseRooms}</DataField>
              <DataField label='Banheiros'>{survey.houseBathrooms}</DataField>
            </DataRow>

            <DataRow>
              <DataField label='Acesso aos cômodos da casa'>
                {HOME_ACCESS_LEVELS[survey.homeAccessLevel]}
              </DataField>
              <DataField label='Meios de transporte'>
                <DataList
                  values={survey.transportModes.map(
                    (mode) => TRANSPORT_MODES[mode],
                  )}
                />
              </DataField>
            </DataRow>
          </DataDisplay>
        </Card>

        <Card className='p-6'>
          <CardHeader
            icon={GraduationCapIcon}
            title='Escolaridade e trabalho'
          />
          <DataDisplay>
            <DataRow>
              <DataField label='Grau de instrução'>
                {EDUCATION_LEVELS[survey.educationLevel]}
              </DataField>
              <DataField label='Situação laboral'>
                {EMPLOYMENT_STATUSES[survey.employmentStatus]}
              </DataField>
              <DataField label='Interrupção de estudos após diagnóstico'>
                {survey.studyInterruption
                  ? STUDY_INTERRUPTION_SITUATIONS[survey.studyInterruption]
                  : null}
              </DataField>
            </DataRow>

            <DataRow>
              <DataField label='Profissão'>{survey.profession}</DataField>
              <DataField label='Cargo'>{survey.jobTitle}</DataField>
              <DataField label='Faixa salarial'>
                {SALARY_RANGES[survey.salaryRange]}
              </DataField>
            </DataRow>

            <DataRow>
              <DataField label='Demitido após diagnóstico'>
                {renderYesNo(survey.dismissedAfterDiagnosis)}
              </DataField>
              <DataField label='Mudou de profissão'>
                {renderYesNo(survey.changedProfession)}
              </DataField>
              <DataField label='Nova profissão'>
                {survey.changedProfessionTo}
              </DataField>
            </DataRow>

            <DataRow>
              <DataField label='Vaga atual é PCD'>
                {survey.currentJobIsPcd !== null
                  ? renderYesNo(survey.currentJobIsPcd)
                  : null}
              </DataField>
              <DataField label='Recebe auxílio-doença'>
                {SICKNESS_BENEFIT_STATUSES[survey.receivesSicknessBenefit]}
              </DataField>
              <DataField label='Recebe BPC/LOAS'>
                {BPC_LOAS_STATUSES[survey.receivesBpcLoas]}
              </DataField>
            </DataRow>
          </DataDisplay>
        </Card>
      </div>

      <Card className='p-6'>
        <CardHeader icon={HospitalIcon} title='Diagnóstico' />
        <DataDisplay>
          <DataRow>
            <DataField label='Diagnóstico'>
              {DIAGNOSIS[survey.diagnosis]}
            </DataField>
            <DataField label='Data do diagnóstico'>
              {survey.diagnosisDate
                ? formatDate(survey.diagnosisDate, { dateStyle: 'long' })
                : null}
            </DataField>
            <DataField label='Tempo até diagnóstico'>{`${survey.timeToDiagnosis} ${TIME_UNITS[survey.timeToDiagnosisUnit]}`}</DataField>
            <DataField label='Crises antes do diagnóstico'>
              {renderValueOrNotProvided(survey.crisesBeforeDiagnosis)}
            </DataField>
            <DataField label='Crises desde o diagnóstico'>
              {renderValueOrNotProvided(survey.crisesSinceDiagnosis)}
            </DataField>
          </DataRow>

          <DataRow>
            <DataField label='Sintomas da primeira crise/surto'>
              <DataList
                values={survey.firstCrisisSymptoms.map(
                  (s) => FIRST_CRISIS_SYMPTOMS[s],
                )}
              />
            </DataField>
            <DataField label='Áreas afetadas'>
              <DataList
                values={survey.affectedAreas.map((a) => AFFECTED_AREAS[a])}
              />
            </DataField>
            <DataField label='Especialistas antes do neurologista'>
              <DataList
                values={survey.specialistsBeforeDiagnosis.map(
                  (s) => SPECIALTIES_BEFORE_DIAGNOSIS[s],
                )}
              />
            </DataField>
          </DataRow>

          <DataRow>
            <DataField label='Hospital do diagnóstico'>
              {survey.diagnosisHospitalName}
            </DataField>
            <DataField label='Médico(a) do diagnóstico'>
              {survey.diagnosingDoctorName}
            </DataField>
            <DataField label='Documento, exame ou sintoma do diagnóstico'>
              {survey.diagnosisDocument}
            </DataField>
            <DataField label='Hospital de tratamento'>
              {survey.currentTreatmentHospital}
            </DataField>
            <DataField label='CEP do hospital'>
              {survey.currentTreatmentHospitalCep}
            </DataField>
            <DataField label='Neurologista atual'>
              {survey.currentNeurologist}
            </DataField>
          </DataRow>

          <DataRow>
            <DataField label='Faz tratamento na cidade'>
              {TREATMENT_LOCATIONS[survey.treatmentInHomeCity]}
            </DataField>
            <DataField label='Há neurologistas na cidade'>
              {renderYesNo(survey.hasNeurologistsInCity)}
            </DataField>
            <DataField label='Ação em sintomas de crise'>
              {CRISIS_ACTIONS[survey.crisisAction]}
            </DataField>
          </DataRow>

          <DataRow>
            <DataField label='Suspeitaram de esclerose múltipla'>
              {renderYesNo(survey.suspectedMultipleSclerosis)}
            </DataField>
            <DataField label='Suspeitas'>
              {survey.otherSuspectedDiseases}
            </DataField>
          </DataRow>
        </DataDisplay>
      </Card>

      <Card className='p-6'>
        <CardHeader icon={HeartPulseIcon} title='Acompanhamento e saúde' />
        <DataDisplay>
          <DataRow>
            <DataField label='Acompanhamento especializado'>
              <DataList
                values={survey.followUpSpecialties.map(
                  (s) => FOLLOW_UP_SPECIALTIES[s],
                )}
              />
            </DataField>
            <DataField label='Medicamentos para NMO'>
              <DataList values={survey.nmoMedications} />
            </DataField>
            <DataField label='Outros acompanhamentos'>
              <DataList values={survey.otherFollowUpProfessionals} />
            </DataField>
            <DataField label='Outros medicamentos'>
              <DataList values={survey.generalMedications} />
            </DataField>
          </DataRow>

          <DataRow>
            <DataField label='Tem plano de saúde'>
              {renderYesNo(survey.hasHealthInsurance)}
            </DataField>
            <DataField label='Como faz acompanhamento'>
              {FOLLOW_UP_HOW[survey.followUpHow]}
            </DataField>
            <DataField label='Crises após começar os medicamentos'>
              {renderValueOrNotProvided(survey.crisesAfterMedication)}
            </DataField>
          </DataRow>

          <DataRow>
            <DataField label='Ação legal para medicação'>
              {LEGAL_ACTIONS[survey.legalActionForMedication]}
            </DataField>
            <DataField label='Usa cadeira de rodas'>
              {renderYesNo(survey.usesWheelchair)}
            </DataField>
          </DataRow>
          <DataRow>
            <DataField label='Tem alteração visual'>
              {renderYesNo(survey.hasVisualAlteration)}
            </DataField>
            <DataField label='Usa bengala para deficiência visual'>
              {renderYesNo(survey.usesVisualCane)}
            </DataField>
            <DataField label='Alteração visual atrapalha o dia a dia'>
              {survey.visualImpairmentAssistance
                ? DAILY_ACTIVITY_ASSISTANCES[survey.visualImpairmentAssistance]
                : null}
            </DataField>
            <DataField label='Usa tecnologia assistiva para enxergar'>
              <DataList
                values={survey.visualAssistiveTechnologies.map(
                  (t) => VISUAL_ASSISTIVE_TECHNOLOGIES[t],
                )}
              />
            </DataField>
          </DataRow>
          <DataRow>
            <DataField label='Tem sequelas motoras'>
              {renderYesNo(survey.hasMotorSequelae)}
            </DataField>
            <DataField label='Sequela motora atrapalha o dia a dia'>
              {survey.motorImpairmentAssistance
                ? DAILY_ACTIVITY_ASSISTANCES[survey.motorImpairmentAssistance]
                : null}
            </DataField>
            <DataField label='Consegue caminhar em um terreno plano'>
              {survey.walkingDistance
                ? WALKING_DISTANCES[survey.walkingDistance]
                : null}
            </DataField>
            <DataField label='Usa bengala ou andador'>
              {survey.usesWalkingAid
                ? renderYesNo(survey.usesWalkingAid)
                : null}
            </DataField>
          </DataRow>
          <DataRow>
            <DataField label='Consegue controlar a bexiga'>
              {BLADDER_CONTROLS[survey.bladderControl]}
            </DataField>
            <DataField label='Função intestinal'>
              {BOWEL_FUNCTIONS[survey.bowelFunction]}
            </DataField>
            <DataField label='Outras sequelas'>
              {survey.otherSequelae}
            </DataField>
          </DataRow>
          <DataRow>
            <DataField label='Medicamentos psicológicos ANTES a NMO'>
              {renderYesNo(survey.psychologicalMedsBeforeNmo)}
            </DataField>
            <DataField label='Medicamentos psicológicos APÓS a NMO'>
              {renderYesNo(survey.psychologicalMedsAfterNmo)}
            </DataField>
            <DataField label='Problemas psicológicos APÓS a NMO'>
              {renderYesNo(survey.psychologicalDiagnosisAfterNmo)}
            </DataField>
          </DataRow>
          <DataRow>
            <DataField label='Tipo sanguíneo'>
              {renderValueOrNotProvided(
                survey.bloodType ? BLOOD_TYPES[survey.bloodType] : null,
              )}
            </DataField>
            <DataField label='Diagnóstico de outra doença'>
              {renderYesNo(survey.hasOtherDisease)}
            </DataField>
            <DataField label='Descrição da outra doença'>
              {survey.otherDiseaseDescription}
            </DataField>
          </DataRow>
        </DataDisplay>
      </Card>

      <Card className='p-6'>
        <CardHeader icon={ActivityIcon} title='Dia a dia' />
        <DataDisplay>
          <DataRow>
            <DataField label='Sente que tem apoio familiar'>
              {FAMILY_SUPPORT[survey.familySupport]}
            </DataField>
            <DataField label='Sente fadiga'>
              {FATIGUE_LEVELS[survey.fatigue]}
            </DataField>
            <DataField label='Faz atividade física'>
              {PHYSICAL_ACTIVITY_FREQUENCIES[survey.physicalActivity]}
            </DataField>
            <DataField label='Fazia atividade física ANTES'>
              {renderValueOrNotProvided(
                survey.physicalActivityType
                  ? PHYSICAL_ACTIVITY_TYPES[survey.physicalActivityType]
                  : null,
              )}
            </DataField>
          </DataRow>
          <DataField label='Fontes de informação sobre NMO'>
            <DataList
              values={survey.informationSources.map(
                (s) => INFORMATION_SOURCES[s],
              )}
            />
          </DataField>
          <DataField label='Percepção de vida hoje'>
            {survey.lifePerception}
          </DataField>
          <DataField label='Sonhos'>{survey.dreams}</DataField>
          <DataField label='Informações adicionais'>
            {survey.additionalInfo}
          </DataField>
        </DataDisplay>
      </Card>
    </>
  )
}
