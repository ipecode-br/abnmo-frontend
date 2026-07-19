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
  DIAGNOSIS_TYPES,
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
import {
  SurveyCardContent,
  SurveyCardItem,
  SurveyCardItems,
  SurveyCardRow,
} from '@/modules/surveys/survey-card'
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
                id={survey.signatureId!}
                className='flex-1 md:w-44'
                size='sm'
              />
            )}
            <NavButton
              href={ROUTES.patients.details.info(patient.id)}
              className='max-md:flex-1'
              variant='outline'
              size='sm'
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

      <Card className='p-6'>
        <CardHeader icon={UserCircleIcon} title='Dados pessoais' />
        <SurveyCardContent>
          <SurveyCardRow>
            <SurveyCardItem
              label='Telefone'
              value={formatPhoneNumber(patient.phone)}
            />
            <SurveyCardItem label='E-mail' value={patient.email} />
            <SurveyCardItem label='CPF' value={formatCpfNumber(patient.cpf)} />
            <SurveyCardItem
              label='Data de nascimento'
              value={formatDate(survey.dateOfBirth, { dateStyle: 'short' })}
            />
            <SurveyCardItem label='Número do SUS' value={patient.susId} />
          </SurveyCardRow>

          <SurveyCardRow>
            <SurveyCardItem label='Gênero' value={GENDERS[survey.gender]} />
            <SurveyCardItem label='Raça' value={RACES[survey.race]} />
            <SurveyCardItem
              label='Estado civil'
              value={MARITAL_STATUSES[survey.maritalStatus]}
            />
            <SurveyCardItem
              label='CEP'
              value={formatCepNumber(survey.addressCep)}
            />
            <SurveyCardItem
              label='Estado'
              value={BRAZIL_STATES[survey.addressState]}
            />
            <SurveyCardItem label='Cidade' value={survey.addressCity} />
            <SurveyCardItem label='Rua' value={survey.addressStreet} />
            <SurveyCardItem label='Número' value={survey.addressNumber} />
            <SurveyCardItem label='Bairro' value={survey.addressNeighborhood} />
          </SurveyCardRow>

          <SurveyCardRow>
            <SurveyCardItem
              label='Morou em outro lugar'
              value={survey.hasLivedElsewhere ? 'Sim' : 'Não'}
            />
            <SurveyCardItem
              label='Descrição'
              value={survey.livedElsewhereDescription}
            />
          </SurveyCardRow>
        </SurveyCardContent>
      </Card>

      <div className='grid gap-6 lg:grid-cols-2'>
        <Card className='p-6'>
          <CardHeader icon={Users2Icon} title='Dados familiares' />
          <SurveyCardContent>
            <SurveyCardRow>
              <SurveyCardItem
                label='Número de filhos'
                value={survey.numberOfChildren}
              />
              <SurveyCardItem
                label='Idade dos filhos'
                value={survey.childrenAges?.map(String).join(', ') ?? null}
              />
              <SurveyCardItem
                label='Pensão alimentícia para filhos em fase escolar'
                value={
                  survey.childrenSchoolSupportSituation
                    ? CHILDREN_SCHOOL_SUPPORT_SITUATIONS[
                        survey.childrenSchoolSupportSituation
                      ]
                    : null
                }
              />
            </SurveyCardRow>

            <SurveyCardRow>
              <SurveyCardItem
                label='Renda familiar'
                value={FAMILY_INCOMES[survey.familyIncome]}
              />
              <SurveyCardItem
                label='Situação de moradia'
                value={HOUSING_SITUATIONS[survey.housingSituation]}
              />
            </SurveyCardRow>

            <SurveyCardRow>
              <SurveyCardItem
                label='Pessoas na casa'
                value={String(survey.householdSize)}
              />
              <SurveyCardItem
                label='Cômodos'
                value={String(survey.houseRooms)}
              />
              <SurveyCardItem
                label='Banheiros'
                value={String(survey.houseBathrooms)}
              />
            </SurveyCardRow>

            <SurveyCardRow>
              <SurveyCardItem
                label='Acesso aos cômodos da casa'
                value={HOME_ACCESS_LEVELS[survey.homeAccessLevel]}
              />
              <SurveyCardItems
                label='Meios de transporte'
                values={survey.transportModes.map(
                  (mode) => TRANSPORT_MODES[mode],
                )}
              />
            </SurveyCardRow>
          </SurveyCardContent>
        </Card>

        <Card className='p-6'>
          <CardHeader
            icon={GraduationCapIcon}
            title='Escolaridade e trabalho'
          />
          <SurveyCardContent>
            <SurveyCardRow>
              <SurveyCardItem
                label='Grau de instrução'
                value={EDUCATION_LEVELS[survey.educationLevel]}
              />
              <SurveyCardItem
                label='Situação laboral'
                value={EMPLOYMENT_STATUSES[survey.employmentStatus]}
              />
              <SurveyCardItem
                label='Interrupção de estudos após diagnóstico'
                value={
                  survey.studyInterruption
                    ? STUDY_INTERRUPTION_SITUATIONS[survey.studyInterruption]
                    : null
                }
              />
            </SurveyCardRow>

            <SurveyCardRow>
              <SurveyCardItem label='Profissão' value={survey.profession} />
              <SurveyCardItem label='Cargo' value={survey.jobTitle} />
              <SurveyCardItem
                label='Faixa salarial'
                value={SALARY_RANGES[survey.salaryRange]}
              />
            </SurveyCardRow>

            <SurveyCardRow>
              <SurveyCardItem
                label='Demitido após diagnóstico'
                value={renderYesNo(survey.dismissedAfterDiagnosis)}
              />
              <SurveyCardItem
                label='Mudou de profissão'
                value={renderYesNo(survey.changedProfession)}
              />
              <SurveyCardItem
                label='Nova profissão'
                value={survey.changedProfessionTo}
              />
            </SurveyCardRow>

            <SurveyCardRow>
              <SurveyCardItem
                label='Vaga atual é PCD'
                value={
                  survey.currentJobIsPcd !== null
                    ? renderYesNo(survey.currentJobIsPcd)
                    : null
                }
              />
              <SurveyCardItem
                label='Recebe auxílio-doença'
                value={
                  SICKNESS_BENEFIT_STATUSES[survey.receivesSicknessBenefit]
                }
              />
              <SurveyCardItem
                label='Recebe BPC/LOAS'
                value={BPC_LOAS_STATUSES[survey.receivesBpcLoas]}
              />
            </SurveyCardRow>
          </SurveyCardContent>
        </Card>
      </div>

      <Card className='p-6'>
        <CardHeader icon={HospitalIcon} title='Diagnóstico' />
        <SurveyCardContent>
          <SurveyCardRow>
            <SurveyCardItem
              label='Diagnóstico'
              value={DIAGNOSIS_TYPES[survey.diagnosis]}
            />
            <SurveyCardItem
              label='Data do diagnóstico'
              value={
                survey.diagnosisDate
                  ? formatDate(survey.diagnosisDate, { dateStyle: 'long' })
                  : null
              }
            />
            <SurveyCardItem
              label='Tempo até diagnóstico'
              value={`${survey.timeToDiagnosis} ${TIME_UNITS[survey.timeToDiagnosisUnit]}`}
            />
            <SurveyCardItem
              label='Crises antes do diagnóstico'
              value={renderValueOrNotProvided(survey.crisesBeforeDiagnosis)}
            />
            <SurveyCardItem
              label='Crises desde o diagnóstico'
              value={renderValueOrNotProvided(survey.crisesSinceDiagnosis)}
            />
          </SurveyCardRow>

          <SurveyCardRow>
            <SurveyCardItems
              label='Sintomas da primeira crise/surto'
              values={survey.firstCrisisSymptoms.map(
                (s) => FIRST_CRISIS_SYMPTOMS[s],
              )}
            />
            <SurveyCardItems
              label='Áreas afetadas'
              values={survey.affectedAreas.map((a) => AFFECTED_AREAS[a])}
            />
            <SurveyCardItems
              label='Especialistas antes do neurologista'
              values={survey.specialistsBeforeDiagnosis.map(
                (s) => SPECIALTIES_BEFORE_DIAGNOSIS[s],
              )}
            />
          </SurveyCardRow>

          <SurveyCardRow>
            <SurveyCardItem
              label='Hospital do diagnóstico'
              value={survey.diagnosisHospitalName}
            />
            <SurveyCardItem
              label='Médico(a) do diagnóstico'
              value={survey.diagnosingDoctorName}
            />
            <SurveyCardItem
              label='Documento, exame ou sintoma do diagnóstico'
              value={survey.diagnosisDocument}
            />
            <SurveyCardItem
              label='Hospital de tratamento'
              value={survey.currentTreatmentHospital}
            />
            <SurveyCardItem
              label='CEP do hospital'
              value={survey.currentTreatmentHospitalCep}
            />
            <SurveyCardItem
              label='Neurologista atual'
              value={survey.currentNeurologist}
            />
          </SurveyCardRow>

          <SurveyCardRow>
            <SurveyCardItem
              label='Faz tratamento na cidade'
              value={TREATMENT_LOCATIONS[survey.treatmentInHomeCity]}
            />
            <SurveyCardItem
              label='Há neurologistas na cidade'
              value={renderYesNo(survey.hasNeurologistsInCity)}
            />
            <SurveyCardItem
              label='Ação em sintomas de crise'
              value={CRISIS_ACTIONS[survey.crisisAction]}
            />
          </SurveyCardRow>

          <SurveyCardRow>
            <SurveyCardItem
              label='Suspeitaram de esclerose múltipla'
              value={renderYesNo(survey.suspectedMultipleSclerosis)}
            />
            <SurveyCardItem
              label='Suspeitas'
              value={survey.otherSuspectedDiseases}
            />
          </SurveyCardRow>
        </SurveyCardContent>
      </Card>

      <Card className='p-6'>
        <CardHeader icon={HeartPulseIcon} title='Acompanhamento e saúde' />
        <SurveyCardContent>
          <SurveyCardRow>
            <SurveyCardItems
              label='Acompanhamento especializado'
              values={survey.followUpSpecialties.map(
                (s) => FOLLOW_UP_SPECIALTIES[s],
              )}
            />
            <SurveyCardItems
              label='Medicamentos para NMO'
              values={survey.nmoMedications}
            />
            <SurveyCardItems
              label='Outros acompanhamentos'
              values={survey.otherFollowUpProfessionals}
            />
            <SurveyCardItems
              label='Outros medicamentos'
              values={survey.generalMedications}
            />
          </SurveyCardRow>

          <SurveyCardRow>
            <SurveyCardItem
              label='Tem plano de saúde'
              value={renderYesNo(survey.hasHealthInsurance)}
            />
            <SurveyCardItem
              label='Como faz acompanhamento'
              value={FOLLOW_UP_HOW[survey.followUpHow]}
            />
            <SurveyCardItem
              label='Crises após começar os medicamentos'
              value={renderValueOrNotProvided(survey.crisesAfterMedication)}
            />
          </SurveyCardRow>

          <SurveyCardRow>
            <SurveyCardItem
              label='Ação legal para medicação'
              value={LEGAL_ACTIONS[survey.legalActionForMedication]}
            />
            <SurveyCardItem
              label='Usa cadeira de rodas'
              value={renderYesNo(survey.usesWheelchair)}
            />
          </SurveyCardRow>
          <SurveyCardRow>
            <SurveyCardItem
              label='Tem alteração visual'
              value={renderYesNo(survey.hasVisualAlteration)}
            />
            <SurveyCardItem
              label='Usa bengala para deficiência visual'
              value={renderYesNo(survey.usesVisualCane)}
            />
            <SurveyCardItem
              label='Alteração visual atrapalha o dia a dia'
              value={
                survey.visualImpairmentAssistance
                  ? DAILY_ACTIVITY_ASSISTANCES[
                      survey.visualImpairmentAssistance
                    ]
                  : null
              }
            />
            <SurveyCardItems
              label='Usa tecnologia assistiva para enxergar'
              values={survey.visualAssistiveTechnologies.map(
                (t) => VISUAL_ASSISTIVE_TECHNOLOGIES[t],
              )}
            />
          </SurveyCardRow>
          <SurveyCardRow>
            <SurveyCardItem
              label='Tem sequelas motoras'
              value={renderYesNo(survey.hasMotorSequelae)}
            />
            <SurveyCardItem
              label='Sequela motora atrapalha o dia a dia'
              value={
                survey.motorImpairmentAssistance
                  ? DAILY_ACTIVITY_ASSISTANCES[survey.motorImpairmentAssistance]
                  : null
              }
            />
            <SurveyCardItem
              label='Consegue caminhar em um terreno plano'
              value={
                survey.walkingDistance
                  ? WALKING_DISTANCES[survey.walkingDistance]
                  : null
              }
            />
            <SurveyCardItem
              label='Usa bengala ou andador'
              value={
                survey.usesWalkingAid
                  ? renderYesNo(survey.usesWalkingAid)
                  : null
              }
            />
          </SurveyCardRow>
          <SurveyCardRow>
            <SurveyCardItem
              label='Consegue controlar a bexiga'
              value={BLADDER_CONTROLS[survey.bladderControl]}
            />
            <SurveyCardItem
              label='Função intestinal'
              value={BOWEL_FUNCTIONS[survey.bowelFunction]}
            />
            <SurveyCardItem
              label='Outras sequelas'
              value={survey.otherSequelae}
            />
          </SurveyCardRow>
          <SurveyCardRow>
            <SurveyCardItem
              label='Medicamentos psicológicos ANTES a NMO'
              value={renderYesNo(survey.psychologicalMedsBeforeNmo)}
            />
            <SurveyCardItem
              label='Medicamentos psicológicos APÓS a NMO'
              value={renderYesNo(survey.psychologicalMedsAfterNmo)}
            />
            <SurveyCardItem
              label='Problemas psicológicos APÓS a NMO'
              value={renderYesNo(survey.psychologicalDiagnosisAfterNmo)}
            />
          </SurveyCardRow>
          <SurveyCardRow>
            <SurveyCardItem
              label='Tipo sanguíneo'
              value={renderValueOrNotProvided(
                survey.bloodType ? BLOOD_TYPES[survey.bloodType] : null,
              )}
            />
            <SurveyCardItem
              label='Diagnóstico de outra doença'
              value={renderYesNo(survey.hasOtherDisease)}
            />
            <SurveyCardItem
              label='Descrição da outra doença'
              value={survey.otherDiseaseDescription}
            />
          </SurveyCardRow>
        </SurveyCardContent>
      </Card>

      <Card className='p-6'>
        <CardHeader icon={ActivityIcon} title='Dia a dia' />
        <SurveyCardContent>
          <SurveyCardRow>
            <SurveyCardItem
              label='Sente que tem apoio familiar'
              value={FAMILY_SUPPORT[survey.familySupport]}
            />
            <SurveyCardItem
              label='Sente fadiga'
              value={FATIGUE_LEVELS[survey.fatigue]}
            />
            <SurveyCardItem
              label='Faz atividade física'
              value={PHYSICAL_ACTIVITY_FREQUENCIES[survey.physicalActivity]}
            />
            <SurveyCardItem
              label='Fazia atividade física ANTES'
              value={renderValueOrNotProvided(
                survey.physicalActivityType
                  ? PHYSICAL_ACTIVITY_TYPES[survey.physicalActivityType]
                  : null,
              )}
            />
          </SurveyCardRow>
          <SurveyCardItems
            label='Fontes de informação sobre NMO'
            values={survey.informationSources.map(
              (s) => INFORMATION_SOURCES[s],
            )}
          />
          <SurveyCardItem
            label='Percepção de vida hoje'
            value={survey.lifePerception}
          />
          <SurveyCardItem label='Sonhos' value={survey.dreams} />
          <SurveyCardItem
            label='Informações adicionais'
            value={survey.additionalInfo}
          />
        </SurveyCardContent>
      </Card>
    </>
  )
}
