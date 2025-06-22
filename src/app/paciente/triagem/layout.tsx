import { ScreeningProgress } from './progress'

export default function ScreeningLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className='container mx-auto grid max-w-4xl grid-cols-[20rem_1fr] gap-16 px-8 pt-16'>
      <ScreeningProgress />
      {children}
    </main>
  )
}
