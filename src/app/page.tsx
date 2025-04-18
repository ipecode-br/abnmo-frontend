import { NavButton } from '@/components/ui/nav-button'
import { ROUTES } from '@/constants/routes'

export default function Home() {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-2'>
      <NavButton href={ROUTES.auth.signIn}>Entrar</NavButton>
    </div>
  )
}
