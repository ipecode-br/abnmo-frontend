'use client'

import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import {
  type Breadcrumb,
  BREADCRUMBS,
  type Breadcrumbs,
  type BreadcrumbSection,
} from '@/constants/breadcrumbs'
import { cn } from '@/utils/class-name-merge'

export function Breadcrumbs() {
  const pathnames = usePathname().split('/')

  const section = pathnames[1]
  const breadcrumbSection = BREADCRUMBS[section as BreadcrumbSection]

  if (!breadcrumbSection) {
    return null
  }

  const breadcrumbs = []

  for (const path of pathnames) {
    const breadcrumb = breadcrumbSection[path as Breadcrumb]
    if (breadcrumb) {
      breadcrumbs.push(breadcrumb)
    }
  }

  return (
    <nav
      className='flex items-center gap-2 max-lg:hidden'
      aria-label='Breadcrumbs'
    >
      {breadcrumbs.map((step, index) => {
        const isLastPathname = index === breadcrumbs.length - 1
        const Icon = step.icon

        return (
          <React.Fragment key={step.name}>
            <div className='flex items-center gap-1.5'>
              <Icon
                className={cn(
                  'text-disabled size-4.5',
                  isLastPathname && 'text-foreground',
                )}
              />
              <Link
                href={step.path}
                aria-disabled={isLastPathname}
                className={cn(
                  'text-disabled hover:text-primary text-sm font-medium aria-disabled:pointer-events-none',
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
