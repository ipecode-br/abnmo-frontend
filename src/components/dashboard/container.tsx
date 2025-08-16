export function DashboardContainer({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <main className={`bg-background-soft flex-1 p-8 ${className ?? ''}`}>
      {children}
    </main>
  )
}
