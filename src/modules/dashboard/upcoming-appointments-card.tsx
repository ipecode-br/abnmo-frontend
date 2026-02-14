import { ClipboardCheckIcon } from 'lucide-react'

import {
  getAppointments,
  type GetAppointmentsParams,
} from '@/actions/appointments/get-appointments'
import {
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderTitle,
} from '@/components/section-header'
import { Card } from '@/components/ui/card'
import { NavButton } from '@/components/ui/nav-button'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { ROUTES } from '@/constants/routes'
import { NewAppointmentButton } from '@/modules/appointments/new-appointment-button'

import { AppointmentsTable } from '../appointments/table'

export async function DashboardUpcomingAppointmentsCard() {
  const params: GetAppointmentsParams = {
    startDate: new Date().toISOString(),
    status: 'scheduled',
    orderBy: 'date',
    order: 'ASC',
    limit: 5,
  }

  const response = await getAppointments({
    cacheKey: NEXT_CACHE_TAGS.appointments.query(JSON.stringify(params)),
    params,
  })

  const appointments = response?.appointments ?? []

  return (
    <Card className='p-6 sm:col-span-6'>
      <SectionHeader className='mb-6'>
        <SectionHeaderTitle
          title='Próximos atendimentos'
          icon={<ClipboardCheckIcon />}
        />
        <SectionHeaderActions>
          <NavButton
            size='sm'
            variant='outline'
            href={ROUTES.dashboard.appointments.list}
          >
            Ver todos
          </NavButton>

          <NewAppointmentButton size='sm' />
        </SectionHeaderActions>
      </SectionHeader>

      <AppointmentsTable appointments={appointments} hideColumns={['status']} />
    </Card>
  )
}
