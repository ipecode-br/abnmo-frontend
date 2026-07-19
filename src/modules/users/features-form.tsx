'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { UserPenIcon, UserRoundCheckIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { FormContainer } from '@/components/form/form-container'
import { SwitchGroupInput } from '@/components/form/switch-group-input'
import { Button } from '@/components/ui/button'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import {
  APPOINTMENT_FEATURE_OPTIONS,
  MEMBER_FEATURE_OPTIONS,
  PATIENT_FEATURE_OPTIONS,
  REFERRAL_FEATURE_OPTIONS,
  SURVEY_FEATURE_OPTIONS,
  USER_INVITE_FEATURE_OPTIONS,
} from '@/enums/features'
import { revalidateServerCache } from '@/helpers/revalidate-server-cache'
import { api } from '@/lib/api'
import { User } from '@/types/users'

interface UserFeaturesFormProps {
  user: User
}

export const userFeaturesFormSchema = z.object({
  features: z.array(z.string()),
})
export type UserFeaturesFormSchema = z.infer<typeof userFeaturesFormSchema>

const FEATURES_GROUP = [
  { title: 'Catalogação', options: SURVEY_FEATURE_OPTIONS },
  { title: 'Pacientes', options: PATIENT_FEATURE_OPTIONS },
  { title: 'Equipe', options: MEMBER_FEATURE_OPTIONS },
  { title: 'Convites de membros', options: USER_INVITE_FEATURE_OPTIONS },
  { title: 'Atendimentos', options: APPOINTMENT_FEATURE_OPTIONS },
  { title: 'Encaminhamentos', options: REFERRAL_FEATURE_OPTIONS },
] as const

export function UserFeaturesForm({ user }: UserFeaturesFormProps) {
  const [mode, setMode] = useState<'view' | 'edit'>('view')

  const isAdmin = user.role === 'admin'
  const isViewMode = mode === 'view'

  const formMethods = useForm<UserFeaturesFormSchema>({
    resolver: zodResolver(userFeaturesFormSchema),
    defaultValues: { features: user.features || [] },
    mode: 'onBlur',
  })

  async function submitForm({ features }: UserFeaturesFormSchema) {
    const response = await api(`users/${user.id}/features`, {
      method: 'PATCH',
      body: { features },
    })

    if (!response.success) {
      toast.error(response.message)
      return
    }

    revalidateServerCache(NEXT_CACHE_TAGS.user(user.id))
    toast.success(response.message)
    setMode('view')
  }

  return (
    <section className='space-y-4'>
      <h3 className='text-2xl font-medium'>Permissões</h3>

      {isAdmin && (
        <p>
          Membros <strong>administradores</strong> possuem permissão para
          executar qualquer ação.
        </p>
      )}

      {!isAdmin && (
        <FormProvider {...formMethods}>
          <FormContainer
            onSubmit={formMethods.handleSubmit(submitForm)}
            className='grid gap-x-16 gap-y-8 md:grid-cols-2 md:gap-y-12 xl:grid-cols-3 2xl:grid-cols-4'
          >
            {FEATURES_GROUP.map(({ title, options }) => (
              <fieldset key={title} className='space-y-4'>
                <h4 className='border-border border-b text-xl'>{title}</h4>
                <SwitchGroupInput
                  name='features'
                  options={options}
                  readOnly={isViewMode}
                />
              </fieldset>
            ))}

            <div className='col-span-full flex flex-col gap-4 md:flex-row-reverse'>
              {isViewMode && (
                <Button
                  type='button'
                  variant='outline'
                  className='w-full md:w-40'
                  onClick={() => setMode('edit')}
                >
                  <UserPenIcon />
                  Editar
                </Button>
              )}

              {!isViewMode && (
                <>
                  <Button
                    type='submit'
                    className='md:w-40'
                    loading={formMethods.formState.isSubmitting}
                  >
                    <UserRoundCheckIcon />
                    Salvar
                  </Button>
                  <Button
                    type='button'
                    variant='muted'
                    disabled={formMethods.formState.isSubmitting}
                    onClick={() => {
                      formMethods.reset()
                      setMode('view')
                    }}
                  >
                    <XIcon />
                    Cancelar
                  </Button>
                </>
              )}
            </div>
          </FormContainer>
        </FormProvider>
      )}
    </section>
  )
}
