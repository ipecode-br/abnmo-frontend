'use client'

import { MegaphoneIcon } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { Button, ButtonProps } from '@/components/ui/button'
import { api } from '@/lib/api'

interface SendSurveySignatureReminderButtonProps extends ButtonProps {
  id: string
}

export function SendSurveySignatureReminderButton({
  id,
  ...props
}: SendSurveySignatureReminderButtonProps) {
  const [isPending, startTransition] = useTransition()

  async function handleSendReminder() {
    startTransition(async () => {
      const response = await api(`/surveys/${id}/send-reminder`, {
        method: 'POST',
      })

      if (!response.success) {
        toast.error(response.message)
        return
      }

      toast.success(response.success)
    })
  }

  return (
    <Button onClick={handleSendReminder} loading={isPending} {...props}>
      <MegaphoneIcon />
      Enviar lembrete
    </Button>
  )
}
