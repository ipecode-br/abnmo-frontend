import { toast } from 'sonner'

export function useUtils() {
  function copyToClipboard(
    props: Readonly<{ value?: string | null; message?: string }>,
  ) {
    if (!props.value) return

    const message =
      props.message || 'Item copiado para a área de transferência.'

    try {
      navigator.clipboard.writeText(props.value)
      toast.success(message)
    } catch (error) {
      toast.error('Não foi possível copiar para a área de transferência.')
      console.error('Failed to copy: ', error)
    }
  }

  return { copyToClipboard }
}
