import { ChevronRight, LucideIcon } from 'lucide-react'
import { LinkProps } from 'next/link'

import { ActiveLink } from './sidebar-active-link'

interface NavLinkProps extends LinkProps {
  icon: LucideIcon
  children: string
}

export function NavLink({ icon: Icon, children, ...rest }: NavLinkProps) {
  return (
    <ActiveLink {...rest}>
      <div className='flex flex-row justify-between px-2 py-3'>
        <span className='text-foreground-soft flex items-center'>
          <Icon size={20} />
          <p className='text-color-foreground-soft ml-3 font-medium'>
            {children}
          </p>
        </span>
        <ChevronRight color='gray' size={20} />
      </div>
    </ActiveLink>
  )
}
