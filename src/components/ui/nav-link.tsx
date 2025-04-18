import Link, { type LinkProps } from 'next/link'

import { cn } from '@/utils/class-name-merge'

type NavLinkProps = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

export function NavLink({ className, ...props }: Readonly<NavLinkProps>) {
  return (
    <Link
      className={cn(
        'hover:text-primary underline underline-offset-3 transition-colors',
        className,
      )}
      {...props}
    />
  )
}
