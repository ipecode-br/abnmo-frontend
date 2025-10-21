export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className='container py-8'>{children}</main>
}
