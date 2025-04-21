export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='bg-background-soft flex min-h-svh w-full items-center justify-center bg-[url("/images/background/auth-bg.svg")] bg-center bg-no-repeat px-4 py-8'>
      {children}{' '}
    </div>
  )
}
