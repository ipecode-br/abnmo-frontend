'use client'

import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { BREADCRUMBS, type BreadcrumbType } from '@/constants/breadcrumbs'
import { cn } from '@/utils/class-name-merge'

export function Breadcrumbs() {
  const pathnames = usePathname().split('/')

  const breadcrumbs = []

  for (const path of pathnames) {
    const breadcrumb = BREADCRUMBS[path as BreadcrumbType]
    if (breadcrumb) {
      breadcrumbs.push(breadcrumb)
    }
  }

  return (
    <nav className='flex items-center gap-2' aria-label='Breadcrumbs'>
      {breadcrumbs.map((step, index) => {
        const isLastPathname = index === breadcrumbs.length - 1
        const Icon = step.icon

        return (
          <React.Fragment key={step.name}>
            <div className='flex items-center gap-1'>
              <Icon
                className={cn(
                  'text-disabled size-5',
                  isLastPathname && 'text-foreground',
                )}
              />
              <Link
                href={step.path}
                aria-disabled={isLastPathname}
                className={cn(
                  'text-disabled hover:text-primary focus text-sm font-medium aria-disabled:pointer-events-none',
                  isLastPathname && 'text-foreground',
                )}
              >
                {step.name}
              </Link>
            </div>

            {!isLastPathname && (
              <ChevronRightIcon
                aria-hidden='true'
                className='text-disabled size-4 opacity-50'
              />
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
