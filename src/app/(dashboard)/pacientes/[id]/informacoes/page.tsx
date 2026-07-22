import { ContactRoundIcon, SquareActivityIcon, User2Icon } from 'lucide-react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { canUser } from '@/actions/auth/can-user'
import { getPatient } from '@/actions/patients/get-patient'
import { CopyButton } from '@/components/copy-button'
import {
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderTitle,
} from '@/components/section-header'
import { Avatar } from '@/components/ui/avatar'
import { Card, CardHeader } from '@/components/ui/card'
import {
  DataDisplay,
  DataField,
  DataList,
  DataRow,
} from '@/components/ui/data-display'
import { Divider } from '@/components/ui/divider'
import { List, ListRow } from '@/components/ui/list'
import { Tag } from '@/components/ui/tag'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { ROUTES } from '@/constants/routes'
import {
  BRAZIL_STATES,
  GENDERS,
  KINSHIPS,
  MARITAL_STATUSES,
  RACES,
} from '@/enums/shared'
import { DIAGNOSIS } from '@/enums/surveys'
import { NewAppointmentButton } from '@/modules/appointments/new-appointment-button'
import { DeactivatePatientButton } from '@/modules/patients/deactivate-button'
import { NewReferralButton } from '@/modules/referrals/new-referral-button'
import { calculateAge } from '@/utils/calculate-age'
import { formatCepNumber } from '@/utils/formatters/format-cep-number'
import { formatCpfNumber } from '@/utils/formatters/format-cpf-number'
import { formatDate } from '@/utils/formatters/format-date'
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'

interface PageParams {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const patientId = (await params).id
  const patient = await getPatient(patientId)

  if (!patient) return { title: 'Paciente não encontrado' }

  return { title: patient.name }
}

export default async function Page({ params }: Readonly<PageParams>) {
  const patientId = (await params).id

  const [
    patient,
    canDeactivatePatient,
    canCreateReferral,
    canCreateAppointment,
  ] = await Promise.all([
    getPatient(patientId),
    canUser('deactivate:patient'),
    canUser('create:referral'),
    canUser('create:appointment'),
  ])

  if (!patient) {
    redirect(ROUTES.patients.main)
  }

  const isPatientActive = patient.status === 'active'
  const age = calculateAge(patient.dateOfBirth)
  const supportContacts = patient.supportContacts ?? []
  const hasSupportContacts = supportContacts.length > 0
  const showUpdatedDate =
    new Date(patient.updatedAt) > new Date(patient.createdAt)

  function renderYesNo(value?: boolean | null): string {
    if (value === undefined || value === null) {
      return 'Não informado'
    }
    return value ? 'Sim' : 'Não'
  }

  return (
    <>
      <SectionHeader>
        <SectionHeaderTitle title='Informações' icon={<User2Icon />} />

        {isPatientActive && (
          <SectionHeaderActions>
            {canDeactivatePatient && (
              <DeactivatePatientButton patient={patient} />
            )}
            {canCreateReferral && <NewReferralButton patientId={patient.id} />}
            {canCreateAppointment && (
              <NewAppointmentButton patientId={patient.id} />
            )}
          </SectionHeaderActions>
        )}
      </SectionHeader>

      <Card>
        <header className='flex gap-6'>
          <Avatar src={patient.avatarUrl} className='size-18' />
          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold'>{patient.name}</h2>

            <section className='flex flex-wrap items-center gap-x-12 gap-y-2'>
              <DataField label='Telefone'>
                <div className='flex items-center gap-3'>
                  <span>{formatPhoneNumber(patient.phone)}</span>
                  <WhatsAppButton phone={formatPhoneNumber(patient.phone)} />
                  <CopyButton
                    value={formatPhoneNumber(patient.phone)}
                    message='Telefone copiado para a área de transferência.'
                  />
                </div>
              </DataField>
              <DataField label='E-mail'>
                <div className='flex items-center gap-3'>
                  <span>{patient.email}</span>
                  <CopyButton
                    value={patient.email}
                    message='E-mail copiado para a área de transferência.'
                  />
                </div>
              </DataField>
            </section>
          </div>
        </header>

        <Divider className='my-6' />

        <DataDisplay>
          <DataRow>
            <DataField label='CPF'>{formatCpfNumber(patient.cpf)}</DataField>
            <DataField label='Data de nascimento'>
              {formatDate(patient.dateOfBirth)}{' '}
              <span className='text-foreground-soft font-normal'>
                ({age} anos)
              </span>
            </DataField>
            <DataField label='Gênero'>{GENDERS[patient.gender]}</DataField>
            <DataField label='Cor/Raça'>{RACES[patient.race]}</DataField>
            <DataField label='Estado civil'>
              {MARITAL_STATUSES[patient.maritalStatus]}
            </DataField>
            <DataField label='Cartão SUS'>{patient.susId}</DataField>
          </DataRow>
          <DataRow>
            <DataField label='CEP'>
              {formatCepNumber(patient.addressCep)}
            </DataField>
            <DataField label='Estado'>
              {BRAZIL_STATES[patient.addressState]}
            </DataField>
            <DataField label='Cidade'>{patient.addressCity}</DataField>
            <DataField label='Rua'>{patient.addressStreet}</DataField>
            <DataField label='Número'>{patient.addressNumber}</DataField>
          </DataRow>
        </DataDisplay>
      </Card>

      <Card>
        <CardHeader icon={SquareActivityIcon} title='Saúde do paciente' />
        <DataDisplay>
          <DataRow>
            <DataField label='Diagnóstico'>
              {DIAGNOSIS[patient.diagnosis]}
            </DataField>
            <DataField label='Medicamentos para NMO'>
              <DataList values={patient.nmoMedications} />
            </DataField>
            <DataField label='Medicamentos gerais'>
              <DataList values={patient.generalMedications} />
            </DataField>
          </DataRow>
          <DataRow>
            <DataField label='Tem alteração visual'>
              {renderYesNo(patient.hasVisualAlteration)}
            </DataField>
            <DataField label='Usa bengala para visão'>
              {renderYesNo(patient.usesVisualCane)}
            </DataField>
            <DataField label='Usa cadeira de rodas'>
              {renderYesNo(patient.usesWheelchair)}
            </DataField>
            <DataField label='Tem sequela motora'>
              {renderYesNo(patient.hasMotorSequelae)}
            </DataField>
          </DataRow>
        </DataDisplay>
      </Card>

      <Card>
        <CardHeader
          icon={ContactRoundIcon}
          title='Rede de apoio'
          className='mb-4'
        />
        {hasSupportContacts && (
          <List>
            {supportContacts.map((support, index) => (
              <ListRow key={index} className='flex-wrap'>
                <h3 className='mr-auto font-medium'>{support.name}</h3>
                <Tag size='sm'>{KINSHIPS[support.kinship]}</Tag>
                <div className='flex items-center gap-3'>
                  <span>{formatPhoneNumber(support.phone)}</span>
                  <WhatsAppButton
                    className='ml-2'
                    phone={formatPhoneNumber(support.phone)}
                  />
                  <CopyButton
                    value={formatPhoneNumber(support.phone)}
                    message='Telefone copiado para a área de transferência.'
                  />
                </div>
              </ListRow>
            ))}
          </List>
        )}

        {!hasSupportContacts && (
          <p className='text-foreground-soft'>
            Nenhum contato de apoio cadastrado.
          </p>
        )}
      </Card>

      <div className='text-foreground-soft flex flex-col gap-1 text-sm'>
        <span>
          Conta registrada em{' '}
          {formatDate(patient.createdAt, {
            dateStyle: 'long',
            timeStyle: 'short',
          })}
          .
        </span>
        {showUpdatedDate && (
          <span>
            Última atualização realizada em{' '}
            {formatDate(patient.updatedAt, {
              dateStyle: 'long',
              timeStyle: 'short',
            })}
            .
          </span>
        )}
      </div>
    </>
  )
}
