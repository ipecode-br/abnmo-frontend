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

import { SignOutButton } from '@/components/sign-out-button'
import { NavButton } from '@/components/ui/nav-button'
import { ROUTES } from '@/constants/routes'

export default async function Page() {
  return (
    <div className='flex flex-col gap-8'>
      {SECTIONS.map(({ title, buttons }) => (
        <section key={title} className='space-y-4'>
          <h2 className='text-foreground-soft leading-none'>{title}</h2>
          <div className='flex flex-wrap gap-4 max-sm:flex-col'>
            {buttons.map((button) => (
              <NavButton
                variant='outline'
                key={button.path}
                href={button.path}
                className='justify-start'
              >
                {button.icon} {button.label}
              </NavButton>
            ))}
          </div>
        </section>
      ))}

      <SignOutButton className='mt-4 w-full' />
    </div>
  )
}

const SECTIONS = [
  {
    title: 'Geral',
    buttons: [
      {
        label: 'Tela inicial',
        icon: <LayoutDashboardIcon />,
        path: ROUTES.dashboard.main,
      },
      {
        label: 'Meu perfil',
        icon: <UserCircle2Icon />,
        path: ROUTES.dashboard.profile,
      },
    ],
  },
  {
    title: 'Pacientes',
    buttons: [
      {
        label: 'Pacientes',
        icon: <Users2Icon />,
        path: ROUTES.dashboard.patients.main,
      },
      {
        label: 'Cadastrar paciente',
        icon: <UserPlus2Icon />,
        path: ROUTES.dashboard.patients.new,
      },
    ],
  },
  {
    title: 'Atendimentos',
    buttons: [
      {
        label: 'Atendimentos',
        icon: <ClipboardCheckIcon />,
        path: ROUTES.dashboard.appointments.main,
      },
      {
        label: 'Lista de atendimentos',
        icon: <ClipboardListIcon />,
        path: ROUTES.dashboard.appointments.list,
      },
    ],
  },
  {
    title: 'Encaminhamentos',
    buttons: [
      {
        label: 'Encaminhamentos',
        icon: <ClipboardPasteIcon />,
        path: ROUTES.dashboard.referrals.main,
      },
      {
        label: 'Lista de encaminhamentos',
        icon: <ClipboardListIcon />,
        path: ROUTES.dashboard.referrals.list,
      },
    ],
  },
  {
    title: 'Equipe',
    buttons: [
      {
        label: 'Membros',
        icon: <HeartHandshakeIcon />,
        path: ROUTES.dashboard.users.main,
      },
      {
        label: 'Convites',
        icon: <MailPlusIcon />,
        path: ROUTES.dashboard.users.invites,
      },
    ],
  },
]
