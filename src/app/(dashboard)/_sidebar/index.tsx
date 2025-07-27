'use client'

import {
  Bolt,
  Headset,
  LayoutDashboard,
  LogOutIcon,
  Share2,
  UserRoundCheck,
  Users2Icon,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { NavButton } from '@/components/ui/nav-button'
import { ROUTES } from '@/constants/routes'
import { api } from '@/lib/api'
import { useSidebar } from '@/store/sidebar'
import { cn } from '@/utils/class-name-merge'

import { SidebarAccount } from './account'
import { SidebarHeader } from './header'
import { SidebarHelpCard } from './help-card'

export function DashboardSidebar() {
  const expanded = useSidebar((state) => state.expanded)
  const pathName = usePathname()

  const router = useRouter()

  async function logout() {
    const response = await api('/logout', { method: 'POST' })

    if (!response.success) {
      toast.error(response.message)
      return
    }

    toast.success(response.message)
    router.replace(ROUTES.auth.signIn)
  }

  return (
    <aside
      className={cn(
        'border-border flex min-h-screen shrink-0 flex-col gap-8 border-r py-6 transition-all duration-500',
        expanded ? 'w-68 px-6' : 'w-18 px-4',
      )}
    >
      <SidebarHeader />

      <Divider />

      <section className='mb-auto space-y-8'>
        {SIDEBAR_SECTIONS.map((section) => (
          <section key={section.title} className='transition-all'>
            {expanded && (
              <p className='text-disabled mb-4 text-xs font-medium uppercase'>
                {section.title}
              </p>
            )}
            <nav className='flex flex-col gap-2'>
              {section.links.map((link) => {
                const isActive = link.path === pathName
                return (
                  <NavButton
                    key={link.label}
                    variant='ghost'
                    href={link.path}
                    data-visible={expanded}
                    data-active={isActive}
                    className={cn(
                      '[&_svg]:text-disabled text-foreground-soft size-10 justify-start gap-3 px-2.5 text-base transition-all duration-200',
                      'data-[visible=true]:w-full',
                      'data-[active=true]:bg-accent data-[active=true]:pointer-events-none data-[active=true]:size-10',
                    )}
                  >
                    {link.icon}
                    <span
                      data-visible={expanded}
                      className='opacity-0 transition-opacity duration-200 data-[visible=true]:opacity-100 data-[visible=true]:delay-150'
                    >
                      {link.label}
                    </span>
                  </NavButton>
                )
              })}
            </nav>
          </section>
        ))}
      </section>

      <SidebarHelpCard />

      <Button variant='ghost' className='justify-start' onClick={logout}>
        <LogOutIcon />
        Sair
      </Button>

      <Divider />

      <SidebarAccount />
    </aside>
  )
}

const SIDEBAR_SECTIONS = [
  {
    title: 'Geral',
    links: [
      {
        label: 'Visão Geral',
        icon: <LayoutDashboard />,
        path: ROUTES.dashboard.main,
      },
      {
        label: 'Pacientes',
        icon: <Users2Icon />,
        path: ROUTES.dashboard.patients.main,
      },
      {
        label: 'Encaminhados',
        icon: <Share2 />,
        path: ROUTES.dashboard.forwarded.main,
      },
      {
        label: 'Aprovações',
        icon: <UserRoundCheck />,
        path: ROUTES.dashboard.approvals.main,
      },
    ],
  },
  {
    title: 'Outros',
    links: [
      {
        label: 'Configurações',
        icon: <Bolt />,
        path: ROUTES.dashboard.settings.main,
      },
      {
        label: 'Suporte',
        icon: <Headset />,
        path: ROUTES.dashboard.support.main,
      },
    ],
  },
]
