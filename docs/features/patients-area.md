# Documentação da área do Paciente

## Visão Geral

É a área do sistema destinada exclusivamente à coleta de informações do paciente por meio da triagem.

#### Objetivo principal:

Centralizar o processo de triagem, permitindo que os pacientes forneçam informações de forma estruturada e organizada, que depois serão utilizadas pelo sistema para acompanhamento e tomada de decisões.

## Estrutura de pastas e rotas

Está localizada em:

```
src/
  app/
    paciente/
```

Pastas prefixadas com `_` são componentes auxiliares.

### Rotas principais

- `/paciente` → Página inicial do paciente `(page.tsx)`.
  Exibe um botão de ação que direciona o usuário para a triagem.
- `/paciente/triagem `→ Fluxo de triagem do paciente.

## Layout principal

O layout da área de paciente está em:

```
src/
  app/
    paciente/
      layout.tsx
```

Ele garante que:

- Apenas usuários autorizados tenham acesso.
- A interface mantém um cabeçalho consistente `PatientHeader`.

```tsx
export default async function PatientLayout({ children }) {
  const canAccess = await canUser('view', 'PatientDashboard')

  if (!canAccess) redirect(ROUTES.dashboard.main)

  return (
    <>
      <PatientHeader />
      <Divider />
      {children}
    </>
  )
}
```

### Subrotas de Triagem e Layout

O fluxo de triagem `/paciente/triagem` possui subrotas correspondentes a cada etapa do processo.

o **layout principal** da triagem está definido em:

```
src/
  app/
    paciente/
      triagem/
        layout.tsx
```

É responsável por estruturar a interface da triagem fazendo com que as subrotas são renderizadas dentro `{children}` e que os elementos persistentes, como `ScreeningProgress` localizado em `/triagem/progress.tsx` continue visível e o usuário acompanhe o progresso.

```tsx
import { ScreeningProgress } from './progress'

export default function ScreeningLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className='container grid max-w-4xl grid-cols-[20rem_1fr] gap-16 py-16'>
      <ScreeningProgress />
      {children}
    </main>
  )
}
```

**Cada etapa da triagem é um subrota:**

- `/triagem/laudo-medico` → Informações sobre histórico e laudos médicos.
- `/triagem/rede-de-apoio `→ Dados sobre rede de apoio social e familiar.
- `/triagem/seus-dados` → Informações pessoais e de contato do paciente.

#### Observação

As subrotas são parte do fluxo de triagem e podem ser adicionadas ou modificadas conforme novas funcionalidades sejam implementadas.

## Hooks de triagem

O hook useScreening é responsável por manipular e armazenar informações da triagem do paciente, garantindo que os dados preenchidos em cada etapa sejam preservados no localStorage. Ele também facilita a nevegação entre as subrotas do fluxo de triagem.

### Funcionalidades principais

- `getSotredFormData(schema)` → Recupera os dados armazenados no **localStorage** e valida usando um schema Zod. Retorna null caso não haja dados válidos.

- `saveFormAndGoToPage({ data, path })` → Salva os dados no **localStorage** e navega para a próxima etapa da triagem.
- `finishScreening()` → Finaliza o fluxo de triagem:

  **Futuro:** Será responsável por enviar os dados para o backend e garantir que as informações do paciente sejam persistidas de forma definitiva.
