import type { Metadata } from 'next'

import { SentTable } from './table'

export const metadata: Metadata = {
  title: 'Documentos',
}

export default function Page() {
  return (
    <div className='px-8 pt-8'>
      <SentTable />
    </div>
  )
}
