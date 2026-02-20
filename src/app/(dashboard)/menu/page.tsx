import {
  ClipboardCheckIcon,
  ClipboardListIcon,
  ClipboardPasteIcon,
  HeartHandshakeIcon,
  LayoutDashboardIcon,
  MailPlusIcon,
  UserCircle2Icon,
  UserPlus2Icon,
  Users2Icon,
} from 'lucide-react'

import { canUser } from '@/actions/auth/can-user'
import { SignOutButton } from '@/components/sign-out-button'
import { NavButton } from '@/components/ui/nav-button'
import { ROUTES } from '@/constants/routes'

export default async function Page() {
  const [canCreatePatient, canViewUsers, canViewInvites] = await Promise.all([
    canUser('create', 'Patients'),
    canUser('view', 'Users'),
    canUser('view', 'Invites'),
  ])

  const SECTIONS = [
    {
      title: 'Geral',
      show: true,
      buttons: [
        {
          label: 'Tela inicial',
          icon: <LayoutDashboardIcon />,
          path: ROUTES.dashboard.main,
          show: true,
        },
        {
          label: 'Meu perfil',
          icon: <UserCircle2Icon />,
          path: ROUTES.dashboard.profile,
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
          path: ROUTES.dashboard.patients.main,
          show: true,
        },
        {
          label: 'Cadastrar paciente',
          icon: <UserPlus2Icon />,
          path: ROUTES.dashboard.patients.new,
          show: canCreatePatient,
        },
      ],
    },
    {
      title: 'Atendimentos',
      show: true,
      buttons: [
        {
          label: 'Atendimentos',
          icon: <ClipboardCheckIcon />,
          path: ROUTES.dashboard.appointments.main,
          show: true,
        },
        {
          label: 'Lista de atendimentos',
          icon: <ClipboardListIcon />,
          path: ROUTES.dashboard.appointments.list,
          show: true,
        },
      ],
    },
    {
      title: 'Encaminhamentos',
      show: true,
      buttons: [
        {
          label: 'Encaminhamentos',
          icon: <ClipboardPasteIcon />,
          path: ROUTES.dashboard.referrals.main,
          show: true,
        },
        {
          label: 'Lista de encaminhamentos',
          icon: <ClipboardListIcon />,
          path: ROUTES.dashboard.referrals.list,
          show: true,
        },
      ],
    },
    {
      title: 'Equipe',
      show: canViewUsers || canViewUsers,
      buttons: [
        {
          label: 'Membros',
          icon: <HeartHandshakeIcon />,
          path: ROUTES.dashboard.users.main,
          show: canViewUsers,
        },
        {
          label: 'Convites',
          icon: <MailPlusIcon />,
          path: ROUTES.dashboard.users.invites,
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
            <h2 className='text-foreground-soft leading-none'>{title}</h2>
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
