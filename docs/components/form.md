# Documentação de formulários

Este documento estabelece as diretrizes para criação de formulários no projeto, utilizando React Hook Form em conjunto com Zod para validação de esquemas.

## Regras gerais

- **Validação**: Sempre use Zod para validação de schemas
- **Gerenciamento**: Use React Hook Form para gerenciar estado do formulário
- **Componentes**: Use os componentes padronizados do projeto
- **Nomenclatura**: Siga as convenções estabelecidas no projeto
- **Idioma**: Mensagens de erro e labels em português

## Estrutura de um formulário

### 1. Schema de validação

Todo formulário deve ter um arquivo de schema separado seguindo o padrão:

**Nomenclatura**: `{nome-do-formulario}-form-schema.tsx`

```tsx
// patient-data-form-schema.tsx
import { z } from 'zod'
import { NAME_REGEX, CPF_REGEX } from '@/constants/regex'

export const patientDataFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Insira seu nome completo')
    .regex(NAME_REGEX, 'Insira seu nome e sobrenome'),
  cpf: z
    .string()
    .nonempty('Informe o seu CPF')
    .regex(CPF_REGEX, 'Informe um CPF válido'),
})

export type PatientDataFormSchema = z.infer<typeof patientDataFormSchema>

export const patientDataFormDefaultValues: PatientDataFormSchema = {
  name: '',
  cpf: '',
}
```

### 2. Componente do formulário

**Nomenclatura**: `{nome-do-formulario}-form.tsx`

```tsx
// patient-data-form.tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { FormContainer } from '@/components/form/form-container'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'

import {
  patientDataFormSchema,
  patientDataFormDefaultValues,
  type PatientDataFormSchema,
} from './patient-data-form-schema'

export function PatientDataForm() {
  const formMethods = useForm<PatientDataFormSchema>({
    resolver: zodResolver(patientDataFormSchema),
    defaultValues: patientDataFormDefaultValues,
    mode: 'onBlur',
  })

  function handleSubmit(data: PatientDataFormSchema) {
    // Lógica de envio
  }

  return (
    <FormProvider {...formMethods}>
      <FormContainer onSubmit={formMethods.handleSubmit(handleSubmit)}>
        <TextInput
          name='name'
          label='Nome completo'
          placeholder='Insira seu nome completo'
          isRequired
        />

        <TextInput
          name='cpf'
          label='CPF'
          mask='cpf'
          placeholder='Insira seu CPF'
          isRequired
        />

        <Button type='submit'>Salvar</Button>
      </FormContainer>
    </FormProvider>
  )
}
```

## Componentes de formulário

### FormProvider e FormContainer

Use sempre o `FormProvider` do React Hook Form em conjunto com o `FormContainer`:

```tsx
import { FormProvider, useForm } from 'react-hook-form'
import { FormContainer } from '@/components/form/form-container'
;<FormProvider {...formMethods}>
  <FormContainer onSubmit={formMethods.handleSubmit(handleSubmit)}>
    {/* campos do formulário */}
  </FormContainer>
</FormProvider>
```

### FormField

Use o `FormField` para agrupar campos relacionados:

```tsx
import { FormField } from '@/components/form/form-field'
;<FormField>
  <TextInput name='email' label='E-mail' />
  <PasswordInput name='password' label='Senha' />
</FormField>
```

### Componentes de entrada disponíveis

#### TextInput

```tsx
<TextInput
  name='name' // Nome do campo no schema
  label='Nome completo' // Label exibido
  placeholder='Insira seu nome' // Placeholder
  maxLength={50} // Limite de caracteres
  mask='phone' // Máscara: 'phone' | 'cpf'
  icon={UserIcon} // Ícone do Lucide React
  inputMode='tel' // Modo do teclado mobile
  message='Texto de ajuda' // Mensagem de ajuda
  isRequired // Campo obrigatório
  wrapperClassName='col-span-2' // Classes CSS do wrapper
/>
```

#### SelectInput

```tsx
<SelectInput
  name='state'
  label='Estado'
  options={BRAZILIAN_STATES} // Array de { label, value }
  placeholder='Selecione'
  loading={isLoading} // Estado de carregamento
  disabled={!enabled} // Estado desabilitado
  isRequired
/>
```

#### DateInput

```tsx
<DateInput
  name='dateBirth'
  label='Data de nascimento'
  navMode='dropdown' // Modo de navegação
  blockFutureDates // Bloquear datas futuras
  isRequired
/>
```

#### PasswordInput

```tsx
<PasswordInput
  name='password'
  label='Senha'
  placeholder='Digite sua senha'
  showRequirements // Mostrar requisitos da senha
  isRequired
/>
```

#### CheckboxInput

```tsx
<CheckboxInput name='consent' label='Li e concordo com os termos' />
```

#### RadioInput

```tsx
<RadioInput
  name='gender'
  label='Gênero'
  options={genderOptions} // Array de { label, value }
  isRequired
/>
```

## Padrões de validação

### Validações comuns com Zod

```tsx
import { z } from 'zod'
import {
  NAME_REGEX,
  CPF_REGEX,
  PHONE_REGEX,
  PASSWORD_REGEX,
} from '@/constants/regex'

// Campo obrigatório básico
name: z.string().min(1, 'Campo obrigatório')

// Nome completo
name: z.string()
  .min(1, 'Insira seu nome completo')
  .min(3, 'O nome deve conter mais de 3 caracteres')
  .regex(NAME_REGEX, 'Insira seu nome e sobrenome')

// E-mail
email: z.string().min(1, 'Insira seu e-mail').email('Insira um e-mail válido')

// Telefone
phone: z.string()
  .nonempty('Insira seu telefone')
  .regex(PHONE_REGEX, 'Insira um número de telefone válido')

// CPF
cpf: z.string()
  .nonempty('Informe seu CPF')
  .regex(CPF_REGEX, 'Informe um CPF válido')

// Senha
password: z.string()
  .min(1, 'Insira sua senha')
  .min(8, 'A senha deve ter pelo menos 8 caracteres')
  .regex(PASSWORD_REGEX, 'Senha não atende aos requisitos')

// Data com validação personalizada
dateBirth: z.string().refine(
  (input) => {
    const date = new Date(input)
    return date >= new Date('1900-01-01') && date <= new Date()
  },
  {
    message: 'Informe uma data válida',
  },
)

// Confirmação de senha
export const passwordFormSchema = z
  .object({
    password: z.string().min(1, 'Insira sua senha'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })
```

### Mensagens de erro em português

Todas as mensagens devem estar em português brasileiro:

```tsx
// ✅ Correto
.min(1, 'Campo obrigatório')
.email('Insira um e-mail válido')
.regex(CPF_REGEX, 'Informe um CPF válido')

// ❌ Incorreto
.min(1, 'Required field')
.email('Please enter a valid email')
.regex(CPF_REGEX, 'Invalid CPF')
```

## Configuração do useForm

### Configuração padrão

```tsx
const formMethods = useForm<FormSchema>({
  resolver: zodResolver(formSchema),
  defaultValues: formDefaultValues,
  mode: 'onBlur', // Validar ao perder foco
})
```

### Propriedades importantes

```tsx
// Acessar estado do formulário
const {
  formState: {
    isSubmitting, // Estado de envio
    errors, // Erros de validação
  },
  setValue, // Definir valor de campo
  watch, // Observar valor de campo
  clearErrors, // Limpar erros
  setError, // Definir erro manual
  reset, // Resetar formulário
} = formMethods

// Observar campo específico
const selectedState = watch('state')

// Definir valor
setValue('city', '')

// Limpar erro específico
clearErrors('city')

// Erro manual (ex: erro de API)
setError('root', { message: 'Erro no servidor' })
```

## Layout e estilização

### Grid layout

Use classes do Tailwind CSS para organizar o layout:

```tsx
<FormContainer className='grid grid-cols-2'>
  {/* Campo que ocupa toda a largura */}
  <TextInput
    wrapperClassName='col-span-full'
    // ...
  />

  {/* Campos lado a lado */}
  <SelectInput name='state' />
  <SelectInput name='city' />

  {/* Botão ocupando toda largura com margem superior */}
  <Button className='col-span-full mt-6'>Salvar</Button>
</FormContainer>
```

### Responsividade

Para layouts responsivos, use classes condicionais:

```tsx
<FormContainer className='grid grid-cols-1 md:grid-cols-2'>
  {/* Em mobile: 1 coluna, em desktop: 2 colunas */}
</FormContainer>
```

## Funcionalidades avançadas

### Carregamento dinâmico de opções

```tsx
const UF = watch('state')

const { data: cities, isLoading } = useQuery({
  queryKey: [`cities/${UF}`],
  queryFn: () => getCitiesByUF(UF),
})

const cityOptions =
  cities?.map((city) => ({
    label: city,
    value: city,
  })) ?? []

// Limpar campo dependente quando o pai muda
useEffect(() => {
  if (UF) {
    clearErrors('city')
    setValue('city', '')
  }
}, [UF, clearErrors, setValue])
```

### Persistência de dados

Use localStorage para salvar progresso do usuário:

```tsx
// Hook personalizado para screening
const { getStoredFormData, saveFormAndGoToPage } = useScreening({
  storageKey: PATIENT_STORAGE_KEYS.screening.patientData,
})

// Restaurar dados salvos
useEffect(() => {
  const savedFormData = getStoredFormData(formSchema)

  if (savedFormData) {
    for (const [key, value] of Object.entries(savedFormData)) {
      setValue(key as keyof FormSchema, value)
    }
  }
}, [setValue, getStoredFormData])

// Salvar e navegar
function handleSubmit(data: FormSchema) {
  saveFormAndGoToPage({
    data,
    path: ROUTES.nextPage,
  })
}
```

### Tratamento de erros

```tsx
// Erro de campo específico (vem do schema)
{
  fieldState.error?.message
}

// Erro geral do formulário (ex: API)
const errorMessage = formMethods.formState.errors.root?.message

// Exibir erro
{
  errorMessage && (
    <Alert error className='text-center'>
      {errorMessage}
    </Alert>
  )
}

// Definir erro manualmente
formMethods.setError('root', {
  message: 'Erro ao conectar com o servidor',
})
```

## Exemplo completo

### Schema (user-form-schema.tsx)

```tsx
import { z } from 'zod'
import { NAME_REGEX, EMAIL_REGEX } from '@/constants/regex'

export const userFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Insira seu nome completo')
    .regex(NAME_REGEX, 'Nome inválido'),
  email: z.string().min(1, 'Insira seu e-mail').email('E-mail inválido'),
  phone: z.string().optional(),
  acceptTerms: z.boolean().refine((value) => value === true, {
    message: 'Você deve aceitar os termos',
  }),
})

export type UserFormSchema = z.infer<typeof userFormSchema>

export const userFormDefaultValues: UserFormSchema = {
  name: '',
  email: '',
  phone: '',
  acceptTerms: false,
}
```

### Formulário (user-form.tsx)

```tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MailIcon, UserIcon } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { CheckboxInput } from '@/components/form/checkbox-input'
import { FormContainer } from '@/components/form/form-container'
import { FormField } from '@/components/form/form-field'
import { TextInput } from '@/components/form/text-input'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

import {
  userFormSchema,
  userFormDefaultValues,
  type UserFormSchema,
} from './user-form-schema'

export function UserForm() {
  const formMethods = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: userFormDefaultValues,
    mode: 'onBlur',
  })

  const isSubmitting = formMethods.formState.isSubmitting
  const errorMessage = formMethods.formState.errors.root?.message

  async function handleSubmit(data: UserFormSchema) {
    try {
      // Lógica de envio
      await saveUser(data)
      toast.success('Dados salvos com sucesso!')
    } catch (error) {
      formMethods.setError('root', {
        message: 'Erro ao salvar os dados',
      })
    }
  }

  return (
    <FormProvider {...formMethods}>
      <FormContainer
        className='grid grid-cols-1 gap-6 md:grid-cols-2'
        onSubmit={formMethods.handleSubmit(handleSubmit)}
      >
        <FormField className='col-span-full'>
          <TextInput
            name='name'
            label='Nome completo'
            icon={UserIcon}
            placeholder='Insira seu nome completo'
            isRequired
          />

          <TextInput
            name='email'
            label='E-mail'
            icon={MailIcon}
            placeholder='Digite seu e-mail'
            isRequired
          />
        </FormField>

        <TextInput
          name='phone'
          label='Telefone'
          mask='phone'
          placeholder='(00) 00000-0000'
          wrapperClassName='col-span-full'
        />

        <CheckboxInput
          name='acceptTerms'
          label='Aceito os termos de uso'
          wrapperClassName='col-span-full'
        />

        <Button type='submit' loading={isSubmitting} className='col-span-full'>
          Salvar dados
        </Button>

        {errorMessage && (
          <Alert error className='col-span-full text-center'>
            {errorMessage}
          </Alert>
        )}
      </FormContainer>
    </FormProvider>
  )
}
```

## Boas práticas

### 1. Validação

- Use `mode: 'onBlur'` para validar ao perder foco
- Defina mensagens claras e em português
- Use regex das constants para validações padronizadas
- Implemente validações customizadas com `.refine()`

### 2. UX/UI

- Use placeholders descritivos
- Indique campos obrigatórios com `isRequired`
- Forneça feedback visual para estados de carregamento
- Agrupe campos relacionados com `FormField`

### 3. Máscaras de entrada

- Use `mask='phone'` para telefones
- Use `mask='cpf'` para CPF
- Use `inputMode='tel'` para números de telefone
- Use `inputMode='numeric'` para números

### 4. Estados de carregamento

- Desabilite o botão durante envio com `loading` ou `disabled`
- Use o estado `isSubmitting` do formState
- Forneça feedback visual com spinners

### 5. Tratamento de erro

- Use `setError('root')` para erros gerais
- Exiba mensagens de erro com o componente `Alert`
- Limpe erros quando necessário com `clearErrors`

## Organização de arquivos

```
feature/
  _components/
    user-form.tsx              ← Componente do formulário
    user-form-schema.tsx       ← Schema de validação
  _types/
    user.ts                    ← Types relacionados
  _hooks/
    use-user-form.ts          ← Hook personalizado (se necessário)
```

## Checklist de formulário

Antes de finalizar um formulário, verifique:

- Schema de validação criado com Zod?
- Mensagens de erro em português?
- Valores padrão definidos?
- FormProvider configurado corretamente?
- Componentes de input apropriados?
- Estados de carregamento implementados?
- Tratamento de erro implementado?
- Layout responsivo configurado?
- Campos obrigatórios marcados?
- Máscaras aplicadas onde necessário?
