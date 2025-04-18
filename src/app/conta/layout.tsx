export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex min-h-svh w-full items-center justify-center bg-[url("/images/background/auth-bg.svg")] bg-center bg-no-repeat p-4'>
      {children}{' '}
    </div>
  )
}
