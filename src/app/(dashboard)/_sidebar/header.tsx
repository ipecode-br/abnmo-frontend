import logo from '@images/logo/logo-triagem.svg'
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { useSidebar } from '@/store/sidebar'
import { cn } from '@/utils/class-name-merge'

export function SidebarHeader() {
  const expanded = useSidebar((state) => state.expanded)
  const toogleSidebar = useSidebar((state) => state.toogleSidebar)

  return (
    <header
      className={cn(
        'border-border text-foreground-soft flex items-center justify-between gap-4',
        !expanded && 'flex-col',
      )}
    >
      <Link href={ROUTES.dashboard.main}>
        <div className={cn('mr-auto flex items-center', !expanded && 'p-1')}>
          <Image src={logo} alt='Símbolo do SVM' className='size-8 shrink-0' />
          {expanded && <p className='ml-2 text-base font-bold'>SVM</p>}
        </div>
      </Link>
      <Button
        size='icon'
        variant='ghost'
        className='text-disabled hover:text-foreground-soft'
        onClick={toogleSidebar}
      >
        {expanded ? <PanelLeftCloseIcon /> : <PanelLeftOpenIcon />}
      </Button>
    </header>
  )
}
