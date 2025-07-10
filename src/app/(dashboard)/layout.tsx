'use client'

import { DashboardSidebar } from '@/app/(dashboard)/_sidebar'
import { Modal } from '@/components/modal'
import { ModalContent } from '@/components/modal/content'

import { DashboardHeader } from './_header'

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex min-h-svh'>
      <DashboardSidebar />

      <div className='flex flex-1 flex-col overflow-hidden'>
        <DashboardHeader />
        {children}
      </div>
      <div>
        <Modal position='center'>
          <ModalContent>
            <h1>teste</h1>
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}
