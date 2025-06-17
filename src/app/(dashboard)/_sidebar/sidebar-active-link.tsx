'use client'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { cloneElement, ReactElement } from 'react'

import { cn } from '@/utils/class-name-merge'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement<{ className?: string }>
}
export function ActiveLink({ children, ...rest }: ActiveLinkProps) {
  const pathName = usePathname()
  let isActive = false

  if (pathName === rest.href || pathName === rest.as) {
    isActive = true
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className: cn(
          'flex flex-row justify-between px-2 py-3',
          isActive && 'bg-[var(--color-accent)] rounded-[12px]',
        ),
      })}
    </Link>
  )
}
