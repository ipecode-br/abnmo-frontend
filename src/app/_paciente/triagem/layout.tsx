import { ScreeningProgress } from './progress'

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className='container grid max-w-5xl grid-cols-[20rem_1fr] gap-16 py-16'>
      <ScreeningProgress />
      {children}
    </main>
  )
}
