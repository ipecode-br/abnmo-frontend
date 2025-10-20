import type { Metadata } from 'next'

import { FormSentTable } from './table'

export const metadata: Metadata = {
  title: 'Documentos',
}

export default function Page() {
  return (
    <div className='px-8 pt-8'>
      <FormSentTable />
    </div>
  )
}
