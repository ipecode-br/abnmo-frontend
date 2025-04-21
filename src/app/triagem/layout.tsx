export default function ScreeningLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <header className='container mx-auto grid grid-cols-[20rem_1fr] px-8'>
        Header
      </header>
      {children}
    </div>
  )
}
