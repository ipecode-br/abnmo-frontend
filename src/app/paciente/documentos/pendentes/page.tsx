import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentos',
}

export default function Page() {
  return (
    <div className='px-8 pt-8'>
      <p>Pendentes</p>
    </div>
  )
}
