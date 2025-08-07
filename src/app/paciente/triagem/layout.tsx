import { ScreeningProgress } from './progress'

export default function ScreeningLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className='container grid max-w-4xl grid-cols-[20rem_1fr] gap-16 py-16'>
      <ScreeningProgress />
      {children}
    </main>
  )
}
