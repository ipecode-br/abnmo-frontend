import {
  ClipboardCheckIcon,
  ClipboardListIcon,
  ClipboardPasteIcon,
  HeartHandshakeIcon,
  LayoutDashboardIcon,
  LayoutListIcon,
  MailPlusIcon,
  UserCircle2Icon,
  Users2Icon,
} from 'lucide-react'

import { canUser } from '@/actions/auth/can-user'
import { SignOutButton } from '@/components/sign-out-button'
import { NavButton } from '@/components/ui/nav-button'
import { ROUTES } from '@/constants/routes'

export default async function Page() {
  const [
    canViewSurveys,
    canViewAppointment,
    canViewAllAppointments,
    canViewReferral,
    canViewAllReferrals,
    canViewUsers,
    canViewInvites,
  ] = await Promise.all([
    canUser('read:survey:others'),
    canUser('read:appointment'),
    canUser('read:appointment:others'),
    canUser('read:referral'),
    canUser('read:referral:others'),
    canUser('read:user:others'),
    canUser('read:user-invite'),
  ])

  const SECTIONS = [
    {
      title: 'Geral',
      show: true,
      buttons: [
        {
          label: 'Tela inicial',
          icon: <LayoutDashboardIcon />,
          path: ROUTES.main,
          show: true,
        },
        {
          label: 'Meu perfil',
          icon: <UserCircle2Icon />,
          path: ROUTES.profile,
          show: true,
        },
      ],
    },
    {
      title: 'Catalogação',
      show: canViewSurveys,
      buttons: [
        {
          label: 'Visão geral',
          icon: <ClipboardListIcon />,
          path: ROUTES.surveys.main,
          show: true,
        },
        {
          label: 'Lista de catalogações',
          icon: <LayoutListIcon />,
          path: ROUTES.surveys.all,
          show: true,
        },
      ],
    },
    {
      title: 'Pacientes',
      show: true,
      buttons: [
        {
          label: 'Pacientes',
          icon: <Users2Icon />,
          path: ROUTES.patients.main,
          show: true,
        },
      ],
    },
    {
      title: 'Atendimentos',
      show: canViewAppointment || canViewAllAppointments,
      buttons: [
        {
          label: 'Visão geral',
          icon: <ClipboardCheckIcon />,
          path: ROUTES.appointments.main,
          show: canViewAppointment,
        },
        {
          label: 'Lista de atendimentos',
          icon: <ClipboardListIcon />,
          path: ROUTES.appointments.list,
          show: canViewAllAppointments,
        },
      ],
    },
    {
      title: 'Encaminhamentos',
      show: canViewReferral || canViewAllReferrals,
      buttons: [
        {
          label: 'Visão geral',
          icon: <ClipboardPasteIcon />,
          path: ROUTES.referrals.main,
          show: canViewReferral,
        },
        {
          label: 'Lista de encaminhamentos',
          icon: <ClipboardListIcon />,
          path: ROUTES.referrals.list,
          show: canViewAllReferrals,
        },
      ],
    },
    {
      title: 'Equipe',
      show: canViewUsers || canViewInvites,
      buttons: [
        {
          label: 'Membros',
          icon: <HeartHandshakeIcon />,
          path: ROUTES.users.main,
          show: canViewUsers,
        },
        {
          label: 'Convites',
          icon: <MailPlusIcon />,
          path: ROUTES.users.invites,
          show: canViewInvites,
        },
      ],
    },
  ]

  return (
    <div className='flex flex-col gap-8'>
      {SECTIONS.map(({ title, buttons, show }) => {
        if (!show) return null

        return (
          <section key={title} className='space-y-4'>
            <h2 className='text-foreground-soft text-lg leading-none font-medium'>
              {title}
            </h2>

            <div className='flex flex-wrap gap-4 max-sm:flex-col'>
              {buttons.map((button) => {
                if (!button.show) return null

                return (
                  <NavButton
                    variant='outline'
                    key={button.path}
                    href={button.path}
                    className='justify-start'
                  >
                    {button.icon} {button.label}
                  </NavButton>
                )
              })}
            </div>
          </section>
        )
      })}

      <SignOutButton className='mt-4 w-full' />
    </div>
  )
}
