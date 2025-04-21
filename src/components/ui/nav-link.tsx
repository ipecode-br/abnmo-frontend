import Link, { type LinkProps } from 'next/link'

import { cn } from '@/utils/class-name-merge'

type NavLinkProps = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

export function NavLink({ className, ...props }: Readonly<NavLinkProps>) {
  return (
    <Link
      className={cn(
        'hover:text-primary ring-offset-background focus-visible:ring-ring underline underline-offset-3 transition-colors focus-visible:rounded focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className,
      )}
      {...props}
    />
  )
}
