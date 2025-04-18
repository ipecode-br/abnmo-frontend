import Link, { type LinkProps } from 'next/link'

import { type ButtonProps, buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils/class-name-merge'

interface NavButtonProps
  extends LinkProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
}

export function NavButton({
  variant,
  size,
  className,
  ...props
}: Readonly<NavButtonProps>) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      Entrar
    </Link>
  )
}
