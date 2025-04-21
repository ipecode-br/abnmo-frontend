import { ScreeningFormsSidebar } from './sidebar'

export default function ScreeningFormsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className='container mx-auto grid grid-cols-[20rem_1fr] gap-16 px-8'>
      <ScreeningFormsSidebar />
      <main>{children}</main>
    </main>
  )
}
