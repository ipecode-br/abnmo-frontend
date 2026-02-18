import Link, { type LinkProps } from 'next/link'

import { cn } from '@/utils/class-name-merge'

type NavLinkProps = LinkProps & Omit<React.ComponentProps<'a'>, 'href'>

export function NavLink({ className, ...props }: Readonly<NavLinkProps>) {
  return (
    <Link
      className={cn(
        'hover:text-primary outline-ring underline underline-offset-2 outline-offset-4 transition-colors focus-visible:rounded',
        className,
      )}
      {...props}
    />
  )
}
