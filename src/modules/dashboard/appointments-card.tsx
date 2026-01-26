import { Users2Icon } from 'lucide-react'

import {
  getAppointments,
  type GetAppointmentsParams,
} from '@/actions/appointments/get-appointments'
import { DataTableHeader } from '@/components/data-table/header'
import { DataTableHeaderActions } from '@/components/data-table/header/actions'
import { DataTableHeaderInfo } from '@/components/data-table/header/info'
import { Card } from '@/components/ui/card'
import { NavButton } from '@/components/ui/nav-button'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { ROUTES } from '@/constants/routes'
import { NewAppointmentButton } from '@/modules/appointments/new-appointment-button'

import { AppointmentsTable } from '../appointments/table'

export async function DashboardAppointmentsCard() {
  const params: GetAppointmentsParams = {
    status: 'scheduled',
    limit: 5,
  }

  const response = await getAppointments({
    params,
    cacheKey: NEXT_CACHE_TAGS.appointments.query(JSON.stringify(params)),
  })

  const appointments = response?.appointments ?? []

  return (
    <Card className='p-6 sm:col-span-6'>
      <DataTableHeader className='mb-8'>
        <DataTableHeaderInfo
          icon={<Users2Icon />}
          iconClassName='text-foreground-soft'
          title='Fila de atendimento'
        />

        <DataTableHeaderActions>
          <NavButton
            size='sm'
            variant='outline'
            href={ROUTES.dashboard.appointments.list}
          >
            Ver todos
          </NavButton>

          <NewAppointmentButton size='sm' />
        </DataTableHeaderActions>
      </DataTableHeader>

      <AppointmentsTable appointments={appointments} />
    </Card>
  )
}
