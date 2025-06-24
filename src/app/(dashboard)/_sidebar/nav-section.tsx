import { ReactNode } from 'react'

interface NavSectionProps {
  title: string
  children: ReactNode
}

export function SidebarNavSection({
  title,
  children,
}: Readonly<NavSectionProps>) {
  return (
    <div>
      <p className='text-disabled mb-4 text-xs font-medium uppercase'>
        {title}
      </p>
      <div className='flex flex-col gap-2'>{children}</div>
    </div>
  )
}
