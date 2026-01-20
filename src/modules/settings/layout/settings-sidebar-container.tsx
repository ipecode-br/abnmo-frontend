export function SettingsSidebarContainer({
  ...props
}: Readonly<React.ComponentProps<'aside'>>) {
  return (
    <div className='relative'>
      <aside
        className={
          'border-border flex h-screen w-60 shrink-0 flex-col gap-8 overflow-x-hidden overflow-y-auto border-r px-6 py-6'
        }
        {...props}
      />
    </div>
  )
}
