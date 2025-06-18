'use client'

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function ButtonNewPatient() {
  const router = useRouter()

  function handleClick() {
    router.push('/signIn')
  }

  return (
    <button
      className='flex items-center gap-1 rounded bg-green-800 px-3 py-1.5 text-sm text-white hover:bg-green-800'
      onClick={handleClick}
      type='button'
    >
      <Plus size={16} /> Novo paciente
    </button>
  )
}
