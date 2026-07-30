# Documentação do Dashboard

## Visão geral

Área principal de gerenciamento do sistema. Apenas profissionais (admin, gestão, enfermagem, especialista) podem acessar.

## Estrutura

```
src/
  app/
    (dashboard)/
      layout.tsx              # Layout principal: Sidebar + Header + TabButtons + BottomBar
      loading.tsx             # PageLoader com "Carregando tela inicial..."
      page.tsx                # Visão geral (estatísticas e indicadores)
      pacientes/              # Gerenciamento de pacientes
        [id]/
          informacoes/        # Detalhes do paciente
          atendimentos/       # Atendimentos do paciente
          encaminhamentos/    # Encaminhamentos do paciente
          historico/          # Histórico do paciente
          _documentos/        # Documentos do paciente (rota interna)
      atendimentos/           # Lista de atendimentos
        lista/                # Todos os atendimentos
      encaminhamentos/        # Lista de encaminhamentos
        lista/                # Todos os encaminhamentos
      catalogacao/            # Catalogações (surveys)
        [id]/detalhes/        # Detalhes de uma catalogação
        todas/                # Todas as catalogações
      equipe/                 # Membros da equipe
        [id]/                 # Detalhes do membro
        convites/             # Convites pendentes
      perfil/                 # Perfil do usuário logado
      menu/                   # Menu de navegação full-page
      _aprovacoes/            # Rotas de aprovação (internas)
        aprovacoes-pendentes/
        envios-pendentes/
        aprovados/
      _configuracoes/         # Configurações (internas)
        fontes/
  components/
    sidebar/                  # Barra lateral com navegação
      index.tsx, container.tsx, header.tsx, account.tsx, menu-section.tsx
    dashboard/
      header.tsx              # Cabeçalho do dashboard
      tab-buttons.tsx         # Abas de navegação horizontal
    bottom-bar.tsx            # Barra inferior (mobile)
  providers/
    permissions-provider.tsx  # Provedor de permissões
```

## Layout principal

O `(dashboard)/layout.tsx` monta a estrutura base:

```
Sidebar | [DashboardHeader + DashboardTabButtons + main content] | BottomBar
```

- Obtém o usuário atual via `getCurrentUser()`
- Envolve tudo com `PermissionsProvider`
- Sidebar é responsiva (colapsa/expande), persiste estado via cookie

## Controle de acesso

O layout do dashboard carrega o usuário e o `PermissionsProvider` disponibiliza as permissões para toda a árvore de componentes. Cada página/componente verifica permissões via:

- **Server**: `canUser(feature, compareToId?)` de `actions/auth/can-user.ts`
- **Client**: `usePermissionsStore().can(feature, compareToId?)`

## Sidebar

Construída com seções condicionais baseadas nas permissões do usuário:

- **Geral**: Visão geral, Perfil
- **Catalogação**: visível se `read:survey:others`
- **Pacientes**: sempre visível
- **Atendimentos**: visível se `read:appointment` ou `read:appointment:others`
- **Encaminhamentos**: visível se `read:referral` ou `read:referral:others`
- **Equipe**: visível se `read:user:others` ou `read:user-invite`

A sidebar expandida mostra avatar, nome e email do usuário com menu dropdown (Perfil / Sair).
