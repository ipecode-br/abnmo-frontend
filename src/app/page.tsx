import { NavButton } from '@/components/ui/nav-button'
import { getRoutes } from '@/constants/routes'

export default function Home() {
  const routes = getRoutes()

  return (
    <div className='flex h-screen flex-col items-center justify-center gap-2'>
      <NavButton href={routes.auth.signIn}>Entrar</NavButton>
    </div>
  )
}
