import { Loader2Icon } from 'lucide-react'

interface PageLoaderProps {
  text: string
}

export function PageLoader({ text }: Readonly<PageLoaderProps>) {
  return (
    <div className='flex flex-1 animate-pulse flex-col items-center justify-center gap-3'>
      <Loader2Icon className='size-10 animate-spin' />
      <span>{text}</span>
    </div>
  )
}
